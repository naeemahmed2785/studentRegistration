var student1 = { fName: "Mike", lName: "Holding", DOB: "17/01/2001", Gender: "M", year: "11", email: "abc@yahoo.com", address: "51 endsleigh gardens", postcode: "ig1 3eq", tel: "123456" };
var student2 = { fName: "Steve", lName: "Smith", DOB: "20/03/2003", Gender: "M", year: "10", email: "xyz@gmail.com", address: "11 devore road", postcode: "ig4 9eq", tel: "987654" };
var student3 = { fName: "John", lName: "Doe", DOB: "23/05/1999", Gender: "M", year: "13", email: "jkl@yahoo.com", address: "18 diana close", postcode: "e18 1nb", tel: "963258" };
var student4 = {
    fName: "Jennifer",
    lName: "Lopez",
    DOB: "15/06/2000",
    Gender: "F",
    year: "12",
    email: "jlopez@hotmail.com",
    address: "01 syemour gardens",
    postcode: "e17 4hq",
    tel: "147852"
};

var myArray = [student1, student2, student3, student4];
var selectedStudent;
var action;

function App_Start() {
    document.getElementById('submit').addEventListener('click', onSubmit_Click);
    document.getElementById("fName").addEventListener("blur", leave_input);
    LoadData();
    // find the [submit] button
    // [addEventListener] when some one [click] that button
    // execute the funciton [onSubmit_Clik]
};

function LoadData() {

    var str = '<table class="table">'
    str = str + '<tr>'
    str = str + '<th>Edit</th>'
    str = str + '<th>Delete</th>'

    for (var p in student1) {
        str = str + '<th>' + p + '</th>';
    }

    str = str + '</tr>'

    for (var i = 0; i < myArray.length; i++) {
        str = str + '<tr>';
        var student = myArray[i];

        str = str + '<td><button onclick="onEdit_Click(\'' + student.fName + '\')">Edit</button></td>';
        str = str + '<td><button onclick="onDelete_Click(\'' + student.fName + '\')">Delete</button></td>';
        
        for (var p in student) {
            str = str + '<td>' + student[p] + '</td>';
        }
        str = str + '</tr>';

    }

    document.getElementById('studentGrid').innerHTML = str;
}

function onSubmit_Click(e) {

    if (validate('lName')) {
        selectedStudent.lName = document.getElementById('lName').value;
    } else {
        return;
    }

    if (validate('DOB')) {
        selectedStudent.DOB = document.getElementById('DOB').value;
    } else {
        return;
    }

    if (validate('gender')) {
        selectedStudent.Gender = document.getElementById('gender').value;
    } else {
        return;
    }

    if (validate('num')) {
        selectedStudent.year = document.getElementById('num').value;
    } else {
        return;
    }

    if (validate('email')) {
        selectedStudent.email = document.getElementById('email').value;
    } else {
        return;
    }

    if (validate('address')) {
        selectedStudent.address = document.getElementById('address').value;
    } else {
        return;
    }

    if (validate('postcode')) {
        selectedStudent.postcode = document.getElementById('postcode').value;
    } else {
        return;
    }

    if (validate('telephone')) {
        selectedStudent.tel = document.getElementById('telephone').value;
    } else {
        return;
    }

    var index = findIndexByObject(selectedStudent);
    if (action == 'edit') {
        myArray[index] = selectedStudent;
    } else {
        myArray.push(selectedStudent);
    }

    clearData();
    LoadData();
    action = '';

};

// function validate(id) {
//     var controlValue = document.getElementById(id).value;
//     if (controlValue === '') {
//         alert('Please enter valid last ' + id);
//         return false;
//     } else {
//         return true;
//     }
// }



function clearData() {

    document.getElementById('fName').value = '';
    document.getElementById('lName').value = '';
    document.getElementById('DOB').value = '';
    document.getElementById('gender').value = '';
    document.getElementById('num').value = '';
    document.getElementById('email').value = '';
    document.getElementById('address').value = '';
    document.getElementById('postcode').value = '';
    document.getElementById('telephone').value = '';

}



function leave_input(e) {
    var studentName = e.target.value;
    var selectedStudent = findStudentByName(studentName)

    if (selectedStudent == undefined) {
        document.getElementById("lblMessage").style.visibility = "visible";

    } else {
        console.log(selectedStudent);
        populateStudentData(selectedStudent);
    }
}

function SelectElement(ddl, valueToSelect) {
    var element = document.getElementById(ddl);
    element.value = valueToSelect;

}

function onEdit_Click(firstName) {
    action = 'edit';
    selectedStudent = findStudentByName(firstName);
    populateStudentData(selectedStudent);
}


function onDelete_Click(firstName) {

    if(confirm('This will delete the record. Are you sure?')) {
        var selectedStudent = findStudentByName(firstName);
        var index = findIndexByObject(selectedStudent);
        myArray.splice(index, 1);
        LoadData();
    }
}

function findIndexByObject(student) {
    var index;
    for (var i = 0; i < myArray.length; i++) {
        var s = myArray[i];
        if (s.fName == student.fName) {
            index = i;
        }
    }
    return index;
}

function findStudentByName(studentName) {
    var studentToReturn;
    for (i = 0; i < myArray.length; i++) {
        var student = myArray[i];

        if (studentName == student.fName) {
            studentToReturn = student;

        }
    };
    return studentToReturn;
}

function populateStudentData(student) {
    document.getElementById("fName").value = student.fName;
    document.getElementById("lblMessage").style.visibility = "hidden";
    document.getElementById("lName").value = student.lName;
    document.getElementById("DOB").value = student.DOB;
    SelectElement('gender', student.Gender);
    document.getElementById("num").value = student.year;
    document.getElementById("email").value = student.email;
    document.getElementById("address").value = student.address;
    document.getElementById("postcode").value = student.postcode;
    document.getElementById("telephone").value = student.tel;
}
