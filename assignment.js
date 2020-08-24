//get json data
var json_data = JSON.parse(data);


function load() {
    //change contents of load data button to refresh after it is clicked
    document.getElementById("btn").innerHTML="Refresh";

    //make sure that initially table is empty
    document.getElementById("mytable").innerHTML='';

    //creating columns and ther headings
    //making a row for headings
    var x = document.createElement("TR");
    x.setAttribute("id", "headings");
    document.getElementById("mytable").appendChild(x);

    
    //making columns and giving names to them by taking attributes of the very first user
    for(user in json_data) {
        for(col_name in json_data[user]) {
            var y = document.createElement("TH");
            var t = document.createTextNode(col_name);
            y.appendChild(t);
            document.getElementById("headings").appendChild(y);
        }
        //adding edit delete column
        var y = document.createElement("TH");
        var t = document.createTextNode("Edit");
        y.appendChild(t);
        document.getElementById("headings").appendChild(y);
        //breaking loop as attributes of only first user will do the work
        break;
    }

    //adding rows of for all users
    for(user in json_data) {
        //make row
        var x = document.createElement("TR");
        //setting row id
        x.setAttribute("id", "row-"+user);
        document.getElementById("mytable").appendChild(x);
        //push data into row
        make_row(user);
    }
}

function make_row(user) {
    //get row by id
    var row = document.getElementById("row-"+user);
    //make sure that the row is empty
    row.innerHTML='';
    //push data into row
    for(attribute in json_data[user]) {
        var y = document.createElement("TD");
        var t;
        if(json_data[user][attribute] == null) t = document.createTextNode('');
        else t = document.createTextNode(json_data[user][attribute]);
        y.appendChild(t);
        row.appendChild(y);
    }
    //add edit and delete buttons in the last cell
    add_edit_delete(user);
}

function add_edit_delete(user) {
    var edit=document.createElement("button");
    var del=document.createElement("button");
    edit.id = user;
    del.id = user;
    edit.innerHTML = "Edit";
    del.innerHTML = "Delete";
    //calling functions by passing user id
    del.setAttribute("onClick", "del_row(this.id)");
    edit.setAttribute("onClick", "edit_row(this.id)");
    //create cell
    var cell = document.createElement("TD");
    //append buttons to the cell
    cell.appendChild(edit);
    cell.appendChild(del);
    //append cell to the row
    document.getElementById("row-"+user).appendChild(cell);
}

function del_row(user) {
    //delete particular user from json file
    delete json_data[user];
    //reload the table
    load();
}

function save_row(user) {
    //updating row's attributes by taking values from input fields by their ids
    for(attribute in json_data[user]) {
        json_data[user][attribute] = document.getElementById(user+"-"+attribute).value;
    }
    //rewrite the contents of the row to show any change(s)
    make_row(user);
}


function edit_row(user) {
    //getting row by its id
    row = document.getElementById("row-"+user);
    //firstly clearing all contents of the row
    row.innerHTML = '';
    //making input fields and displaying old data as default
    for(attribute in json_data[user]) {
        var cell = document.createElement("TD");
        var cell_data;
        if(json_data[user][attribute] == null) cell_data = '';
        else cell_data = json_data[user][attribute];
        //making input field
        var input = document.createElement("input");
        input.setAttribute("type", "text");
        input.setAttribute("value", cell_data);
        input.setAttribute("id", user+"-"+attribute);
        cell.appendChild(input);
        row.appendChild(cell);
    }
    //change last cell contents to save and cancel buttons
    var save=document.createElement("button");
    var cancel=document.createElement("button");
    save.id = user;
    save.innerHTML = "Save";
    cancel.id = user;
    cancel.innerHTML = "Cancel";
    //calling function by passing user id
    cancel.setAttribute("onClick", "make_row(this.id)");
    save.setAttribute("onClick", "save_row(this.id)");
    //create cell
    var cell = document.createElement("TD");
    //append buttons to the cell
    cell.appendChild(save);
    cell.appendChild(cancel);
    //append cell to the row
    row.appendChild(cell);
}