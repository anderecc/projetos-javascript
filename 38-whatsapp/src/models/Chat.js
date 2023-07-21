import {
    addDoc,
    collection,
    doc,
    getDoc,
    getDocs,
    or,
    query,
    where,
} from 'firebase/firestore';
import { db } from '../lib/firebase';

const Chat = {
    _users: [],
    _timeStamp: null,
    getRef: function () {
        return collection(db, '/chats');
    },
    createIfNotExists: function (meEmail, contactEmail) {
        return new Promise((resolve, reject) => {
            this.find(meEmail, contactEmail)
                .then((chat) => {
                    if (!chat) {
                        //create
                        this.create(meEmail, contactEmail).then((chat) => {
                            resolve(chat);
                        });
                    } else {
                        resolve(chat);
                    }
                })
                .catch((err) => reject(err));
        });
    },
    find: function (meEmail, contactEmail) {
        return new Promise((resolve, reject) => {
            const _query = query(
                this.getRef(),
                or(
                    where('users', '==', [
                        `${btoa(meEmail)}`,
                        `${btoa(contactEmail)}`,
                    ]),
                    where('users', '==', [
                        `${btoa(contactEmail)}`,
                        `${btoa(meEmail)}`,
                    ])
                )
            );

            getDocs(_query)
                .then((res) => {
                    if (res.empty) {
                        resolve(null);
                    } else {
                        const chats = [];
                        res.forEach((chat) =>
                            chats.push({ ...chat.data(), id: chat.id })
                        );
                        chats.every((item) => {
                            if (
                                item.users ===
                                    [btoa(meEmail), btoa(contactEmail)] || [
                                    btoa(contactEmail),
                                    btoa(meEmail),
                                ]
                            ) {
                                resolve(item);
                            }
                        });
                    }
                })
                .catch((err) => reject(err));
        });
    },
    create: function (meEmail, contactEmail) {
        const users = [btoa(meEmail), btoa(contactEmail)];
        return new Promise((resolve, reject) => {
            addDoc(this.getRef(), { users, timeStamp: new Date() })
                .then((_doc) => {
                    const ref = doc(this.getRef(), _doc.id);
                    getDoc(ref)
                        .then((chat) => {
                            resolve(chat);
                        })
                        .catch((err) => reject(err));
                })
                .catch((err) => reject(err));
        });
    },
};

export default Chat;
