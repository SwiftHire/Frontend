import React from 'react';
// import { Col, Row } from 'react-bootstrap';
export const PdfDownloadButton = () => {
    return (
        <button className=' bg-primary flex gap-8 text-white justify-between items-center rounded-xl py-3 px-3 text-[14px]'>
            <span className=' flex gap-3 justify-center items-center'>
                <span>
                    <svg width="12" height="14" viewBox="0 0 12 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M1.5 13H10.5M6 1V10M6 10L8.625 7.375M6 10L3.375 7.375" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                    </svg>
                </span>
                Download
            </span>
            <span>
                <svg width="8" height="6" viewBox="0 0 8 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M1.41706 0.999687L4.00372 3.58635L6.59039 0.999687C6.85039 0.739688 7.27039 0.739688 7.53039 0.999687C7.79039 1.25969 7.79039 1.67969 7.53039 1.93969L4.47039 4.99969C4.21039 5.25969 3.79039 5.25969 3.53039 4.99969L0.470391 1.93969C0.210391 1.67969 0.210391 1.25969 0.470391 0.999687C0.730391 0.746354 1.15706 0.739688 1.41706 0.999687Z" fill="white" />
                </svg>
            </span>
        </button>
    );
};

