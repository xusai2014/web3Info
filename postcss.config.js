module.exports = {
    plugins: [
        require('postcss-css-variables')({
            variables:{
                '--highlight-color': '#43e413',
                '--border-line':'1px solid rgb(128 128 128 / 23%)'
            }
        })
    ]
}