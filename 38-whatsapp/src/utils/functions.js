import {
    getDocs,
    limit,
    onSnapshot,
    orderBy,
    query,
    where,
} from 'firebase/firestore';
import { el } from '../elements';
import Message from '../models/Message';
import format from './format';
import User from '../models/User';
let timerMicrophoneInterval;

export const hideAllPanel = () => {
    el.panelEditProfile.hide();
    el.panelAddContact.hide();
};

export const closeMenuAttach = () => {
    document.removeEventListener('click', closeMenuAttach);
    el.menuAttach.removeClass('open');
};

export const closeAllMainPanel = () => {
    el.panelMessagesContainer.hide();
    el.panelCamera.removeClass('open');
    el.panelDocumentPreview.removeClass('open');
};

export const closeRecordMicrophone = () => {
    el.recordMicrophone.hide();
    el.btnSendMicrophone.show();
    clearInterval(timerMicrophoneInterval);
};

export const startRecordMicrophoneTime = () => {
    const start = Date.now();
    timerMicrophoneInterval = setInterval(() => {
        el.recordMicrophoneTimer.innerText = format.toTime(Date.now() - start);
    }, 100);
};

export const getLastMessage = (chatId) => {
    return new Promise((resolve, reject) => {
        const chatRef = Message.getRef(chatId);
        const _query = query(chatRef, orderBy('timeStamp', 'desc'), limit(1));
        getDocs(_query)
            .then((res) => {
                res.forEach((item) => {
                    resolve(item.data());
                });
            })
            .catch((err) => reject(err));
    });
};

export const getMessageUnread = (chatId) => {
    return new Promise((resolve, reject) => {
        const chatRef = Message.getRef(chatId);
        const _query = query(chatRef, where('status', '!=', 'read'));
        getDocs(_query)
            .then((res) => {
                resolve(res.docs.length);
            })
            .catch((err) => reject(err));
    });
};

export const renderLastMessage = async (chatId, element) => {
    const lastMessage = await getLastMessage(chatId);
    const messagesUnread = await getMessageUnread(chatId);

    if (lastMessage) {
        element.querySelector('.last-message-time').innerText =
            format.timeStampToTime(lastMessage.timeStamp);

        switch (lastMessage.type) {
            case 'document':
                element.querySelector('.last-message-text').innerText =
                    'Documento';
                break;
            case 'audio':
                element.querySelector('.last-message-text').innerText = 'Audio';
                break;
            case 'image':
                element.querySelector('.last-message-text').innerText =
                    'Imagem';
                break;
            case 'contact':
                element.querySelector('.last-message-text').innerText =
                    'Contato';
                break;

            default:
                element.querySelector('.last-message-text').innerText =
                    lastMessage.content;
                break;
        }

        if (User._email === lastMessage.from)
            element.querySelector('.last-message-status').show();
        switch (lastMessage.status) {
            case 'wait':
                element.querySelector(
                    '.last-message-status'
                ).innerHTML = `<span data-icon="msg-time">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 15" width="16" height="15">
                                        <path fill="#859479" d="M9.75 7.713H8.244V5.359a.5.5 0 0 0-.5-.5H7.65a.5.5 0 0 0-.5.5v2.947a.5.5 0 0 0 .5.5h.094l.003-.001.003.002h2a.5.5 0 0 0 .5-.5v-.094a.5.5 0 0 0-.5-.5zm0-5.263h-3.5c-1.82 0-3.3 1.48-3.3 3.3v3.5c0 1.82 1.48 3.3 3.3 3.3h3.5c1.82 0 3.3-1.48 3.3-3.3v-3.5c0-1.82-1.48-3.3-3.3-3.3zm2 6.8a2 2 0 0 1-2 2h-3.5a2 2 0 0 1-2-2v-3.5a2 2 0 0 1 2-2h3.5a2 2 0 0 1 2 2v3.5z"></path>
                                    </svg>
                                </span>`;
                break;
            case 'sent':
                element.querySelector(
                    '.last-message-status'
                ).innerHTML = `<span data-icon="msg-check-dark">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 15" width="16" height="15">
                                        <path fill="#000" d="M10.91 3.316l-.478-.372a.365.365 0 0 0-.51.063L4.566 9.879a.32.32 0 0 1-.484.033L1.891 7.769a.366.366 0 0 0-.515.006l-.423.433a.364.364 0 0 0 .006.514l3.258 3.185c.143.14.361.125.484-.033l6.272-8.048a.365.365 0 0 0-.063-.51z"></path>
                                    </svg>
                                </span>`;
                break;
            case 'received':
                element.querySelector(
                    '.last-message-status'
                ).innerHTML = `<span data-icon="msg-dblcheck">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 15" width="16" height="15">
                                        <path fill="#92A58C" d="M15.01 3.316l-.478-.372a.365.365 0 0 0-.51.063L8.666 9.879a.32.32 0 0 1-.484.033l-.358-.325a.319.319 0 0 0-.484.032l-.378.483a.418.418 0 0 0 .036.541l1.32 1.266c.143.14.361.125.484-.033l6.272-8.048a.366.366 0 0 0-.064-.512zm-4.1 0l-.478-.372a.365.365 0 0 0-.51.063L4.566 9.879a.32.32 0 0 1-.484.033L1.891 7.769a.366.366 0 0 0-.515.006l-.423.433a.364.364 0 0 0 .006.514l3.258 3.185c.143.14.361.125.484-.033l6.272-8.048a.365.365 0 0 0-.063-.51z"></path>
                                    </svg>
                                </span>`;
                break;
            case 'read':
                element.querySelector(
                    '.last-message-status'
                ).innerHTML = `<span data-icon="msg-dblcheck-ack">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 15" width="16" height="15">
                                        <path fill="#4FC3F7" d="M15.01 3.316l-.478-.372a.365.365 0 0 0-.51.063L8.666 9.879a.32.32 0 0 1-.484.033l-.358-.325a.319.319 0 0 0-.484.032l-.378.483a.418.418 0 0 0 .036.541l1.32 1.266c.143.14.361.125.484-.033l6.272-8.048a.366.366 0 0 0-.064-.512zm-4.1 0l-.478-.372a.365.365 0 0 0-.51.063L4.566 9.879a.32.32 0 0 1-.484.033L1.891 7.769a.366.366 0 0 0-.515.006l-.423.433a.364.364 0 0 0 .006.514l3.258 3.185c.143.14.361.125.484-.033l6.272-8.048a.365.365 0 0 0-.063-.51z"></path>
                                    </svg>
                                </span>`;
                break;
            default:
                break;
        }
    }

    if (User._email !== lastMessage.from) {
        element.querySelector('.last-message-status').hide();
    }
    element.querySelector('.messages-count-new').hide();

    if (messagesUnread !== 0 && User._email !== lastMessage.from) {
        element.querySelector('.messages-count-new').innerText = messagesUnread;
        element.querySelector('.messages-count-new').show();
    }
};

export const renderContact = async (contact) => {
    const div = document.createElement('div');
    div.classList.add('contact-item');
    div.id = 'contact-item';
    div.on('click', () => {
        setActiveChat(contact);
    });

    div.innerHTML = `<div class="dIyEr">
    <div class="_1WliW" style="height: 49px; width: 49px;">
    <img src="#" class="Qgzj8 gqwaM contact-photo" style="display:none;">
                            <div class="_3ZW2E">
                                <span data-icon="default-user" class="">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 212 212" width="212" height="212">
                                <path fill="#DFE5E7" d="M106.251.5C164.653.5 212 47.846 212 106.25S164.653 212 106.25 212C47.846 212 .5 164.654.5 106.25S47.846.5 106.251.5z"></path>
                                <g fill="#FFF">
                                <path d="M173.561 171.615a62.767 62.767 0 0 0-2.065-2.955 67.7 67.7 0 0 0-2.608-3.299 70.112 70.112 0 0 0-3.184-3.527 71.097 71.097 0 0 0-5.924-5.47 72.458 72.458 0 0 0-10.204-7.026 75.2 75.2 0 0 0-5.98-3.055c-.062-.028-.118-.059-.18-.087-9.792-4.44-22.106-7.529-37.416-7.529s-27.624 3.089-37.416 7.529c-.338.153-.653.318-.985.474a75.37 75.37 0 0 0-6.229 3.298 72.589 72.589 0 0 0-9.15 6.395 71.243 71.243 0 0 0-5.924 5.47 70.064 70.064 0 0 0-3.184 3.527 67.142 67.142 0 0 0-2.609 3.299 63.292 63.292 0 0 0-2.065 2.955 56.33 56.33 0 0 0-1.447 2.324c-.033.056-.073.119-.104.174a47.92 47.92 0 0 0-1.07 1.926c-.559 1.068-.818 1.678-.818 1.678v.398c18.285 17.927 43.322 28.985 70.945 28.985 27.678 0 52.761-11.103 71.055-29.095v-.289s-.619-1.45-1.992-3.778a58.346 58.346 0 0 0-1.446-2.322zM106.002 125.5c2.645 0 5.212-.253 7.68-.737a38.272 38.272 0 0 0 3.624-.896 37.124 37.124 0 0 0 5.12-1.958 36.307 36.307 0 0 0 6.15-3.67 35.923 35.923 0 0 0 9.489-10.48 36.558 36.558 0 0 0 2.422-4.84 37.051 37.051 0 0 0 1.716-5.25c.299-1.208.542-2.443.725-3.701.275-1.887.417-3.827.417-5.811s-.142-3.925-.417-5.811a38.734 38.734 0 0 0-1.215-5.494 36.68 36.68 0 0 0-3.648-8.298 35.923 35.923 0 0 0-9.489-10.48 36.347 36.347 0 0 0-6.15-3.67 37.124 37.124 0 0 0-5.12-1.958 37.67 37.67 0 0 0-3.624-.896 39.875 39.875 0 0 0-7.68-.737c-21.162 0-37.345 16.183-37.345 37.345 0 21.159 16.183 37.342 37.345 37.342z"></path>
                                        </g>
                                        </svg>
                                        </span>
                                        </div>
                                        </div>
                                        </div>
                                        <div class="_3j7s9">
                                        <div class="_2FBdJ">
                                        <div class="_25Ooe">
                                        <span dir="auto" title="Nome do Contato" class="_1wjpf">${contact.name}</span>
                                        </div>
                                        <div class="_3Bxar">
                                        <span class="_3T2VG last-message-time"></span>
                            </div>
                        </div>
                        <div class="_1AwDx">
                        <div class="_itDl">
                        <span title="digitando…" class="vdXUe _1wjpf typing" style="display:none">digitando…</span>
                        
                        <span class="_2_LEW last-message" id="last-message">
                        <div class="_1VfKB last-message-status"  style="display:none" >
                        <span data-icon="status-dblcheck" class="">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 18 18" width="18" height="18">
                        <path fill="#263238" fill-opacity=".4" d="M17.394 5.035l-.57-.444a.434.434 0 0 0-.609.076l-6.39 8.198a.38.38 0 0 1-.577.039l-.427-.388a.381.381 0 0 0-.578.038l-.451.576a.497.497 0 0 0 .043.645l1.575 1.51a.38.38 0 0 0 .577-.039l7.483-9.602a.436.436 0 0 0-.076-.609zm-4.892 0l-.57-.444a.434.434 0 0 0-.609.076l-6.39 8.198a.38.38 0 0 1-.577.039l-2.614-2.556a.435.435 0 0 0-.614.007l-.505.516a.435.435 0 0 0 .007.614l3.887 3.8a.38.38 0 0 0 .577-.039l7.483-9.602a.435.435 0 0 0-.075-.609z"></path>
                                            </svg>
                                            </span>
                                    </div>
                                    <span dir="ltr" class="_1wjpf _3NFp9 last-message-text"></span>
                                    <div class="_3Bxar">
                                    <span>
                                    <div class="_15G96">
                                    <span class="OUeyt messages-count-new" style="display:none;">1</span>
                                    </div>
                                    </span></div>
                                    </span>
                            </div>
                        </div>
                    </div>`;

    if (contact.photo) {
        let img = div.querySelector('.contact-photo');
        img.src = contact.photo;
        img.show();
    }

    onSnapshot(Message.getRef(contact.chatId), () => {
        renderLastMessage(contact.chatId, div);
    });

    el.contactsMessagesList.appendChild(div);
};

let unsubscribe = null;

export const setActiveChat = (contact) => {
    // tirando o onSnapshot caso tiver um contato com mensagem ativa anterior
    if (Message._contactActive) {
        if (unsubscribe) unsubscribe();
    }
    Message.setContactAtive(contact);
    el.activeName.innerText = contact.name;
    if (contact.photo) {
        el.activePhoto.src = contact.photo;
        el.activePhoto.show();
    }
    el.home.hide();
    el.main.css({ display: 'flex' });

    const ref = Message.getRef(contact.chatId);
    const _query = query(ref, orderBy('timeStamp'));

    unsubscribe = onSnapshot(_query, (docs) => {
        //scroll
        el.panelMessagesContainer.innerText = '';
        const scrollTop = el.panelMessagesContainer.scrollTop;
        const scrollTopMax =
            el.panelMessagesContainer.scrollHeight -
            el.panelMessagesContainer.offsetHeight;
        const autoScroll = scrollTop >= scrollTopMax;
        docs.forEach((doc) => {
            const data = doc.data();
            data.id = doc.id;
            Message.setMessage(data);
            const me = data.from === User._email;
            const view = Message.getViewElement(me);
            el.panelMessagesContainer.appendChild(view);

            if (autoScroll) {
                el.panelMessagesContainer.scrollTop =
                    el.panelMessagesContainer.scrollHeight -
                    el.panelMessagesContainer.offsetHeight;
            } else {
                el.panelMessagesContainer.scrollTop = scrollTop;
            }
        });
    });
};

export const searchContacts = (value) => {
    if (value.length > 0) {
        el.inputSearchContactsPlaceholder.hide();
        User.getContacts(value);
    } else {
        el.inputSearchContactsPlaceholder.show();
        User.getContacts();
    }
};

export const getFileIcon = (type) => {
    switch (type) {
        case 'application/pdf':
            return 'pdf';
        case 'application/vnd.ms-excel':
        case 'application/vdn.openxmlformats-officedocument.spreadsheethl.sheet':
            return 'xls';
        case 'application/vnd.ms-powerpoint':
        case 'application/vdn.openxmlformats-officedocument.presentationml.presentation':
            return 'ppt';
        case 'application/msword':
        case 'application/vdn.openxmlformats-officedocument.wordprocessingml.document':
            return 'doc';
        default:
            return 'generic';
    }
};
