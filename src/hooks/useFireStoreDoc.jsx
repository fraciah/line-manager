import { doc, onSnapshot } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../firebase";

//hook to fetch a single document from a collection

const useFireStoreDoc = (collectionName, id) => {
    const [document, setDocument] = useState("");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const getDocument = () => {
            if (id) {
                const documentRef = doc(db, collectionName, id);
                onSnapshot(documentRef, (snapshot) => {
                    setDocument({
                        ...snapshot.data(),
                        id: snapshot.id,
                    });
                    setLoading(false);
                });
            }
        };
        getDocument();
    }, [id, collectionName]);

    return {
        document,
        loading,
    };
};

export default useFireStoreDoc;
