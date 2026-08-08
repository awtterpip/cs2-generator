document.getElementById('generate').addEventListener('click', () => {
    let next_message_key = document.getElementById('next-message-key').value;
    let reset_key = document.getElementById('reset-key').value;
    var function_name = document.getElementById('internal-function-name').value;
    if(function_name == "") {
        function_name = generateRandomString(10);
    }
    let loop = document.getElementById('loop').checked;
    let message = document.getElementById('message').value;
    let messages = message.split(/\r?\n/);
    var output = `bind ${next_message_key} "${function_name}_say_next"; bind ${reset_key} "alias ${function_name}_say_next ${function_name}_say0"; alias "${function_name}_say_next" "${function_name}_say0"; `
    messages.forEach(function(element, index, array) {
        if(index != array.length - 1) {
            output += `alias "${function_name}_say${index}" "say ${element}; alias ${function_name}_say_next ${function_name}_say${index + 1}"; `
        } else if(!loop) {
                        output += `alias "${function_name}_say${index}" "say ${element}; alias ${function_name}_say_next ${function_name}_say${index + 1}"`
        } else {
            output += `alias "${function_name}_say${index}" "say ${element}; alias ${function_name}_say_next ${function_name}_say0"`
        }

    // Code to execute for each element
    });
    document.getElementById('output').innerHTML = output;
});

function generateRandomString(length) {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}
