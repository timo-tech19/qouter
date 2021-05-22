import { useState, useRef, useCallback } from 'react';
import Cropper from 'react-easy-crop';
import { readURL } from '../helpers/functions';

const ImageCrop = () => {
    const [crop, setCrop] = useState({ x: 0, y: 0 });
    const [zoom, setZoom] = useState(1);
    const [cropImage, setCropImage] = useState(null);
    const previewRef = useRef();
    const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
        console.log(croppedArea, croppedAreaPixels);
    }, []);

    return (
        <Cropper
            image={cropImage}
            crop={crop}
            zoom={zoom}
            aspect={4 / 3}
            onCropChange={setCrop}
            onCropComplete={onCropComplete}
            onZoomChange={setZoom}
            ref={previewRef}
        />
    );
};

export default ImageCrop;
