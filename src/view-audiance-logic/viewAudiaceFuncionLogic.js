import { useState, useEffect } from "react";
import { Schemas } from '../dummy-api/demoApi'
import { postUrl } from '../api-urls/apiUrls'

const ViewAudianceFuction = () => {

    useEffect(() => {
        getSchemas()
    }, [])

    const [schemas, setSchemas] = useState([]);
    const [selectedSchema, setSelectedSchema] = useState('');
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [segmentName, setSegmentName] = useState('');
    const [availableSchemas, setAvailableSchemas] = useState([]);
    const [notification, setNotification] = useState({ message: '', type: '' });

    const getSchemas = () => {
        try {
            const availableRes = Schemas
            setAvailableSchemas(availableRes)
        } catch (error) {
            setNotification({ message: 'Somthing went wrong', type: 'error' });
        }
    }

    const handleAddSchema = () => {
        if (selectedSchema) {
            const schemaToAdd = availableSchemas?.find(schema => schema.value === selectedSchema);
            setSchemas([...schemas, schemaToAdd]);
            setAvailableSchemas(availableSchemas?.filter(schema => schema.value !== selectedSchema));
            setSelectedSchema('');
        }
    };

    const handlePopUp = () => {
        setSegmentName('');
        setSelectedSchema('');
        setSchemas([])
        setIsPopupOpen(true);
    };

    const handleSave = async () => {
        try {
            const data = {
                segment_name: segmentName,
                schema: schemas?.map(schema => ({ [schema.value]: schema.label }))
            };
            console.log(data);

            const response = await fetch(postUrl, {
                method: 'POST',
                mode: 'no-cors',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });
            console.log(response)
            setNotification({ message: 'Data saved successfully!', type: 'success' });
        } catch (error) {
            console.error(error);
            setNotification({ message: 'Something went wrong', type: 'error' });
        } finally {
            setIsPopupOpen(false);
            getSchemas()
            setTimeout(() => setNotification({ message: '', type: '' }), 3000);
        }
    };

    return {
        handleSave, handleAddSchema, setSchemas, schemas, setSelectedSchema, selectedSchema, setAvailableSchemas, availableSchemas, handlePopUp, setSegmentName, segmentName, setIsPopupOpen, isPopupOpen, notification
    }

}

export default ViewAudianceFuction



