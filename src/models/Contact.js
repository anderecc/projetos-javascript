import { collection, doc, getDocs, setDoc } from 'firebase/firestore';
import { db } from '../lib/firebase';
import User from './User';

const Contact = {
    addMeContactInActiveContact: async function (contactActive) {
        const refListContactsOfContactActive = await collection(
            doc(db, 'users', contactActive.email),
            'contacts'
        );

        const refMeContactInContactsOfContactActive = await doc(
            refListContactsOfContactActive,
            btoa(User._email)
        );

        User._user.chatId = contactActive.chatId;

        await getDocs(refListContactsOfContactActive).then((docs) => {
            if (docs.empty) {
                setDoc(refMeContactInContactsOfContactActive, User._user);
            } else {
                docs.forEach((doc) => {
                    const contact = doc.data();
                    if (contact.email === User._email) {
                        return;
                    } else {
                        setDoc(
                            refMeContactInContactsOfContactActive,
                            User._user
                        );
                    }
                });
            }
        });
    },
};

export default Contact;
