$('#nome').blur((e)=>{
    nomeFormat(e) ? $(e.target).removeClass('errado') : $(e.target).addClass('errado')
})
$('#data').blur((e)=>{
    dataFormat(e) ? $(e.target).removeClass('errado') : $(e.target).addClass('errado')
})
$('#phone').blur((e)=>{
    phoneFormat(e) ? $(e.target).removeClass('errado') : $(e.target).addClass('errado')
})
$('#cpf').blur((e)=>{
    cpfFormat(e) ? $(e.target).removeClass('errado') : $(e.target).addClass('errado')
})
$('#email').blur((e)=>{
    emailFormat(e) ? $(e.target).removeClass('errado') : $(e.target).addClass('errado')
})
$('#senha').blur((e)=>{
    senhaFormat(e) ? $(e.target).removeClass('errado') : $(e.target).addClass('errado')
})
$('#senha2').blur((e)=>{
    senha2Format(e) ? $(e.target).removeClass('errado') : $(e.target).addClass('errado')
})
$('.register_btn').click((e)=>{
    validaRegistro(e)
})
function nomeFormat(e){
    //console.log(e)
    let txt = $(e.target).val()
    if(txt == undefined) txt = e
    //console.log(txt)
    let re = /^([a-zA-Z' ]+)$/
    if(!re.test(txt))return false
    let s = ' '
    let str = txt.split(s);
    let i = 0
    while(true)
    {
        if(str[i] == undefined) break
        let c = str[i] + ''
        if(c.length < 2) return false
        i++
    }
    if(i < 2)return false
    return true
    }
    function dataFormat(e){
        let txt = $(e.target).val()
        if(txt == undefined) txt = e
        let s = '-'
        let str = txt.split(s)
        if(str.length != 3)return false
        let today = new Date().toISOString().slice(0, 10)
        let str2 =  today.split(s)
        if(str2[0] - str[0] < 18)return false
        else if(str2[0] - str[0] == 18){
            if(str2[1] - str[1] < 0){
            return false
            }
            else if(str2[1] - str[1] == 0){
            if(str2[2] - str[2] < 0)return false
            }
        }
        if(str2[0] - str[0] > 100) return false
        return true
    }
    function phoneFormat(e){
        let txt = $(e.target).val()
        if(txt == undefined) txt = e
        var re = /^\(?(?:[14689][1-9]|2[12478]|3[1234578]|5[1345]|7[134579])\)? ?(?:[2-8]|9[1-9])[0-9]{3}\-?[0-9]{4}$/
        if(re.test(txt))return true
        return false
    }
    function cpfFormat(e){
        let txt = $(e.target).val()
        if(txt == undefined) txt = e
        var re = /^(([0-9]{3}.[0-9]{3}.[0-9]{3}-[0-9]{2})|([0-9]{11}))$/
        if(re.test(txt))return true
        return false
    }
    function emailFormat(e){
        let txt = $(e.target).val()
        if(txt == undefined) txt = e
        var re = /\S+@\S+\.\S+/
        if(re.test(txt))return true
        return false
    }
    function senhaFormat(e){
        let txt = $(e.target).val()
        if(txt == undefined) txt = e
        var re = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[$*&@#])[0-9a-zA-Z$*&@#]{8,}$/
        if(re.test(txt))return true
        return false
    }
    function senha2Format(e){
        let txt = $(e.target).val()
        if(txt == undefined) txt = e
        if($('#senha').val() == txt) return true
        return false
        
    }
    function validaRegistro(e){
    if((nomeFormat($('#nome').val())) == false){
        $('#nome').addClass('errado')
        e.preventDefault()
        return
    }
    else{
        usuario.nome = $('#nome').val()
    }
    if(dataFormat($('#data').val()) == false){
        $('#data').addClass('errado')
        e.preventDefault()
        return
    }
    else{
        usuario.data = $('#data').val()
    }
    usuario.genero = $('#genero').val()
    if(phoneFormat($('#phone').val()) == false){
        $('#phone').addClass('errado')
        e.preventDefault()
        return
    }
    else
    {
        usuario.telefone = $('#phone').val()
    }
    usuario.formacao = $('#escolaridade').val()
    if(cpfFormat($('#cpf').val()) == false){
        $('#cpf').addClass('errado')
        e.preventDefault()
        return
    }
    else
    {
        usuario.cpf = $('#cpf').val()
    }
    if(emailFormat($('#email').val()) == false){
        $('#email').addClass('errado')
        e.preventDefault()
        return
    }
    else
    {
        usuario.email = $('#email').val()
    }
    if(senhaFormat($('#senha').val()) == false){
        $('#senha').addClass('errado')
        e.preventDefault()
        return
    }
    if(senha2Format($('#senha2').val()) == false){
        $('#senha2').addClass('errado')
        e.preventDefault()
        return
    }
} 