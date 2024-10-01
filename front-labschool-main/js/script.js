const input = document.getElementById('uploadImage')
const preview = document.getElementById('previewImage')

input.addEventListener('change', () => {
    const file = input.files[0]

    if(file){
        const reader = new FileReader()

        reader.onload = (e) => {
            preview.src = e.target.result   
        }
        reader.readAsDataURL(file)
    }
})