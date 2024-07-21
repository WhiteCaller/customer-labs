import React, { useState } from 'react';
import './index.css';
import ViewAudianceFuction from '../view-audiance-logic/viewAudiaceFuncionLogic';

const ViewAudianceDesign = () => {

    const { handleSave, handleAddSchema, schemas, setSelectedSchema, selectedSchema, availableSchemas, handlePopUp, isPopupOpen, segmentName, setSegmentName, setIsPopupOpen, notification } = ViewAudianceFuction()

    return (
        <div className="landing">
            <button onClick={handlePopUp}>Save segment</button>

            {isPopupOpen && (
                <div className="popup">
                    <div className="popup-content">
                        <div className="top-section">
                            <span className="input-container">
                                <label>Enter the Name of the Segment: </label>
                                <input
                                    type="text"
                                    value={segmentName}
                                    placeholder='Name of the Segment'
                                    onChange={(e) => setSegmentName(e.target.value)}
                                />
                            </span>
                            <span>
                                <button className="close-button" onClick={() => setIsPopupOpen(false)}>×</button>
                            </span>
                        </div>
                        <div className="top-section">
                            <p style={{ backgroundColor: 'yellow' }}> To save your segment, you need to add the schemas to build the query</p>
                        </div>

                        <div className="blue-box">
                            {schemas.map(schema => (
                                <div key={schema.value}>
                                    <select>
                                        <option defaultValue={`${schema.label}`} >{schema.label}</option>
                                    </select>
                                </div>
                            ))}
                            {schemas.length != 0 ? <div style={{ marginTop: 5 }}>
                                <button onClick={handleSave}>Save</button>
                            </div> : ''}

                        </div>

                        <div>
                            <select
                                value={selectedSchema}
                                onChange={(e) => setSelectedSchema(e.target.value)}
                            >
                                {availableSchemas.map(schema => (
                                    <option key={schema.value} value={schema.value}>
                                        {schema.label}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div style={{ marginTop: 20 }}>
                            <button className="link-button" onClick={handleAddSchema}>+Add new schema</button>
                        </div>

                    </div>
                </div>
            )}
            <div className={`notification ${notification?.type} ${notification?.message ? 'show' : ''}`}>
                {notification.message}
            </div>
        </div>

    );
};

export default ViewAudianceDesign;
