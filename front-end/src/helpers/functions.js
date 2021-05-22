export function readURL(input, setSource) {
    if (input.files && input.files[0]) {
        var reader = new FileReader();

        reader.onload = function (e) {
            setSource(e.target.result);
        };

        reader.readAsDataURL(input.files[0]); // convert to base64 string
    }
}
