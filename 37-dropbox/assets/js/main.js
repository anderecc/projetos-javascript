/* eslint-disable no-undef */
import {
    onUploadProgress,
    selectedElements,
    showProgress,
    verifySelectedLength,
    verifyType,
} from './actions.js';

import { refDatabase, setRefDatabase } from './firebase/firebase.js';

export let currentFolder = ['HOME'];
let lastFolder = '';

(() => {
    openFolder();
})();

$btn_send_file.addEventListener('click', (e) => {
    e.preventDefault();
    $input_file.click();
});

$input_file.addEventListener('change', (e) => {
    e.preventDefault();
    showProgress(true);

    uploadTask($input_file.files)
        .then((res) => {
            refDatabase.push().set({
                nameFile: res[0].name,
                type: res[0].contentType,
                path: res[0].customMetadata.downloadURL,
                size: res[0].size,
            });
            readFiles();
        })
        .catch((err) => console.log(err));
});

$btn_delete.addEventListener('click', () => {
    deleteTask(selectedElements)
        .then((res) => {
            res.forEach((file) => {
                refDatabase.child(file.key).remove();
                readFiles();
            });
        })
        .catch((err) => console.log(err));
});

$btn_rename.addEventListener('click', () => {
    renameTask(selectedElements[0]);
});

$btn_new_folder.addEventListener('click', () => {
    const nameFile = prompt('Digite um nome para a nova pasta.');

    if (nameFile) {
        refDatabase.push().set({
            nameFile,
            type: 'folder',
            path: currentFolder.join('/'),
        });
        readFiles();
    }
});

function renameTask(element) {
    refDatabase
        .child(element.dataset.key)
        .get()
        .then((res) => {
            if (res.exists()) {
                const data = res.val();
                const newName = prompt('Digite um novo nome');
                if (newName) {
                    refDatabase
                        .child(element.dataset.key)
                        .set({ ...data, nameFile: newName });
                    readFiles();
                } else {
                    alert('Para deve colocar algum nome para alterar.');
                }
            } else {
                console.log('No data available');
            }
        })
        .catch((err) => console.log(err));
}

function deleteTask(items) {
    const promises = [];
    [...items].forEach((file) => {
        promises.push(
            new Promise((resolve, reject) => {
                const key = file.dataset.key;

                if (file.dataset.type === 'folder') {
                    removeFolder(currentFolder.join('/'), file.dataset.name)
                        .then(() => {
                            resolve({ key });
                        })
                        .catch((err) => reject(err));
                } else if (file.dataset.type) {
                    removeFile(currentFolder.join('/'), file.dataset.name)
                        .then(() => {
                            resolve({ key });
                        })
                        .catch((err) => reject(err));
                }
            })
        );
    });

    return Promise.all(promises);
}

function uploadTask(files) {
    const promises = [];

    [...files].forEach((file) => {
        return promises.push(
            new Promise((resolve, reject) => {
                const startUpload = Date.now();
                const fileRef = firebase
                    .storage()
                    .ref(currentFolder.join('/'))
                    .child(file.name);

                let task = fileRef.put(file);
                task.on(
                    'state_changed',
                    (snapshot) => {
                        const loaded = snapshot.bytesTransferred;
                        const total = snapshot.totalBytes;

                        onUploadProgress({ loaded, total, startUpload });
                    },
                    (error) => {
                        console.log(error);
                        showProgress(false);
                        reject(error);
                    },
                    () => {
                        showProgress(false);

                        task.snapshot.ref
                            .getDownloadURL()
                            .then((downloadURL) => {
                                task.snapshot.ref
                                    .updateMetadata({
                                        customMetadata: { downloadURL },
                                    })
                                    .then((metadata) => {
                                        resolve(metadata);
                                    })
                                    .catch((error) => {
                                        console.error(
                                            'Error update metadata:',
                                            error
                                        );
                                        reject(error);
                                    });
                            });
                    }
                );
            })
        );
    });
    return Promise.all(promises);
}

function renderNavLocation() {
    let nav = document.createElement('nav');
    let path = [];

    for (let index = 0; index < currentFolder.length; index++) {
        let span = document.createElement('span');
        let folder = currentFolder[index];
        path.push(folder);

        if (index + 1 === currentFolder.length) {
            span.innerHTML = folder;
        } else {
            span.setAttribute('class', 'breadcrumb-segment__wrapper');

            span.innerHTML = `  <span class="ue-effect-container uee-BreadCrumbSegment-link-0">
                                    <a href="#" data-path="${path.join(
                                        '/'
                                    )}" class="breadcrumb-segment">${folder}</a>
                                </span>
                                <svg width="24" height="24" viewBox="0 0 24 24" class="mc-icon-template-stateless" style="
                                        top: 4px; position: relative; ">
                                        <title>arrow-right</title>
                                        <path d="M10.414 7.05l4.95 4.95-4.95 4.95L9 15.534 12.536 12 9 8.464z" fill="#637282" fill-rule="evenodd"></path>
                                </svg>`;
        }
        nav.appendChild(span);
    }

    $browser_location.innerHTML = nav.innerHTML;

    $browser_location.querySelectorAll('a').forEach((a) =>
        a.addEventListener('click', (e) => {
            e.preventDefault();
            currentFolder = e.target.dataset.path.split('/');
            openFolder();
        })
    );
}

function renderDocument(key, data) {
    if (data.type) {
        const li = document.createElement('li');
        li.dataset.key = key;
        li.dataset.type = data.type;
        li.dataset.name = data.nameFile;

        li.addEventListener('click', (e) => {
            const firstLi = document.querySelector('.selected');
            let firstIndex = null;
            let lastIndex = null;

            $list_files.childNodes.forEach((node, index) => {
                if (!e.ctrlKey) {
                    if (node.dataset.key === key) {
                        node.classList.toggle('selected');
                    } else {
                        node.classList.remove('selected');
                    }
                } else {
                    if (node.dataset.key === key) {
                        node.classList.toggle('selected');
                    }
                }

                if (firstLi === node) firstIndex = index;
                if (li === node) lastIndex = index;
            });

            const indexs = [firstIndex, lastIndex].sort();

            if (firstIndex !== null && lastIndex !== null && e.shiftKey) {
                for (let index = indexs[0]; index <= indexs[1]; index++) {
                    $list_files.childNodes[index].classList.add('selected');
                }
            }
            verifySelectedLength($list_files);
        });

        li.addEventListener('dblclick', () => {
            switch (li.dataset.type) {
                case 'folder':
                    currentFolder.push(data.nameFile);
                    openFolder();
                    break;

                default:
                    window.open(data.path);
                    break;
            }
        });

        li.innerHTML = `${verifyType(data)}
    <div class="name text-center">${data.nameFile}</div>
    `;
        $list_files.appendChild(li);
    }
}

function readFiles() {
    $list_files.innerHTML = '';

    lastFolder = currentFolder.join('/');

    refDatabase.on('value', (snapshot) => {
        snapshot.forEach((item) => {
            const key = item.key;
            const data = item.val();
            renderDocument(key, data);
        });
    });
}

function openFolder() {
    // console.log(currentFolder);
    if (lastFolder) {
        setRefDatabase(lastFolder);
        refDatabase.off('value');

        setRefDatabase(currentFolder.join('/'));
    }
    renderNavLocation();
    readFiles();
}

function removeFile(ref, name) {
    const fileRef = firebase.storage().ref(ref).child(name);

    return fileRef.delete();
}

function removeFolder(ref, name) {
    return new Promise((resolve, reject) => {
        setRefDatabase(ref + '/' + name);
        refDatabase.on('value', (snapshot) => {
            snapshot.forEach((item) => {
                const data = item.val();
                data.key = item.key;

                if (data.type === 'folder') {
                    removeFolder(ref + '/' + name, data.nameFile)
                        .then(() => {
                            resolve({ key: data.key });
                        })
                        .catch((err) => reject(err));
                    // removeFolder(currentFolder.join('/') + name)
                } else if (data.type) {
                    removeFile(ref + '/' + name, data.nameFile)
                        .then(() => {
                            resolve({ key: data.key });
                        })
                        .catch((err) => reject(err));
                }
            });

            refDatabase.remove();
            refDatabase.off('value');
        });
        setRefDatabase(currentFolder.join('/'));
    });
}
