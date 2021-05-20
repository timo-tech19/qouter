import { useState, useCallback } from 'react';
import Cropper from 'react-easy-crop';

const ImageCrop = () => {
    const [crop, setCrop] = useState({ x: 0, y: 0 });
    const [zoom, setZoom] = useState(1);

    const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
        console.log(croppedArea, croppedAreaPixels);
    }, []);

    function readURL(input, target) {
        if (input.files && input.files[0]) {
            var reader = new FileReader();

            reader.onload = function (e) {
                target.setAttribute('src', e.target.result);
            };

            reader.readAsDataURL(input.files[0]); // convert to base64 string
        }
    }

    return (
        <Cropper
            image={`/images/users/cover-default.jpg`}
            crop={crop}
            zoom={zoom}
            aspect={4 / 3}
            onCropChange={setCrop}
            onCropComplete={onCropComplete}
            onZoomChange={setZoom}
        />
    );
};

export default ImageCrop;
