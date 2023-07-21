import {
    doc,
    onSnapshot,
    setDoc,
    updateDoc,
    collection,
    query,
    getDoc,
    where,
} from 'firebase/firestore';
import { db, storage } from '../lib/firebase';
import { renderContact } from '../utils/functions';
import Chat from './Chat';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';

const User = {
    _email: null,
    _user: null,
    _el: null,
    _docRef: null,
    findByEmail: function (userAuth, el) {
        this._email = userAuth.email;
        this._el = el;
        this._docRef = doc(db, 'users', userAuth.email);
        return new Promise((resolve) => {
            onSnapshot(this._docRef, (res) => {
                this._userRef = res.ref;
                if (res.exists()) {
                    const user = res.data();
                    resolve(user);
                    this._user = user;
                } else {
                    const user = {
                        name: userAuth.displayName,
                        email: userAuth.email,
                        photo: userAuth.photoURL,
                    };
                    setDoc(res.ref, user);
                    resolve(user);
                    this._user = user;
                }
            });
        });
    },
    dataChange: async function (user = this._user) {
        document.querySelector('title').innerText = user.name;

        this._el.inputNamePanelEditProfile.innerText = user.name;

        if (user.photo) {
            this._el.imgDefaultPanelEditProfile.hide();
            const photo = this._el.imgPanelEditProfile;
            photo.setAttribute('src', user.photo);
            photo.show();

            const photo2 = this._el.myPhoto.querySelector('img');
            photo2.src = user.photo;
            photo2.show();
        }
        this.getContacts();
    },
    getContacts: function (filter = '') {
        // eslint-disable-next-line no-unused-vars
        return new Promise((resolve, _) => {
            const ref = query(
                collection(this._docRef, 'contacts'),
                where('name', '>=', filter)
            );
            onSnapshot(ref, (res) => {
                this._el.contactsMessagesList.innerText = '';
                resolve(res);
                res.forEach((contact) => {
                    renderContact(contact.data());
                });
            });
        });
    },
    editUser: async function (type, value) {
        switch (type) {
            case 'name':
                updateDoc(this._docRef, { name: value });

                break;
            case 'photo':
                // eslint-disable-next-line no-case-declarations
                const valueRef = ref(
                    storage,
                    `${this._email}/profile/${value.name}`
                );
                uploadBytes(valueRef, value).then(() => {
                    getDownloadURL(valueRef).then((url) => {
                        User._user.photo = url;
                        updateDoc(this._docRef, { photo: url });
                        this.dataChange();
                    });
                });
                break;
            default:
                break;
        }
    },
    addContact: async function (data) {
        //preciso criar uma referencia primeiro para depois adicionar um documento
        return new Promise((resolve, reject) => {
            const contactRef = doc(db, 'users', data.email);
            getDoc(contactRef).then(async (res) => {
                if (res.exists()) {
                    const contact = res.data();

                    await Chat.createIfNotExists(
                        this._email,
                        contact.email
                    ).then((chat) => {
                        contact.chatId = chat.id;
                        this._user.chatId = chat.id;
                    });

                    //adicionando o contato na minha conta
                    const ref = await doc(
                        this._docRef,
                        'contacts',
                        btoa(data.email)
                    );
                    setDoc(ref, contact);
                    this.dataChange();
                    resolve(contact);
                } else {
                    reject();
                    console.log('Contato não encontrado');
                }
            });
        });
    },
};

export default User;
