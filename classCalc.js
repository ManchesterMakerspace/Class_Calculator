// classCalc.js ~ Copyright 2018 Manchester Makerspace ~ MIT License

var calc = {
    cost: function(desiredIncome, consumablesPerStudent, startup, maxStudentsPerClass, preCommitedClasses){
        var totalIncome = desiredIncome * 2;
        // teacher makerspace cut is 50/50, in this way desiredIncome is interchangeble between the space or teacher
        preCommitedClasses = preCommitedClasses ? preCommitedClasses : 1; // theres always at least one class to commit to
        var deferredStartupRate = 0;
        if(startup){
            deferredStartupRate = startup / maxStudentsPerClass / preCommitedClasses;
        } // deffered startup cost over time teacher is willing to commit
        var materialsPerClass = (deferredStartupRate + consumablesPerStudent) * maxStudentsPerClass;
        var totalClassCost = totalIncome + materialsPerClass;
        var costPerStudent = totalClassCost / maxStudentsPerClass;
        console.log('cost per student minus start: ' + totalIncome / maxStudentsPerClass + consumablesPerStudent);
        return costPerStudent;
    },
    submitAction: function(){
        var desiredIncome         = document.getElementById('desiredIncome').value;
        var consumablesPerStudent = document.getElementById('consumablesPerStudent').value;
        var startupCost           = document.getElementById('startup').value;
        var maxStudentsPerClass   = document.getElementById('maxStudentsPerClass').value;
        var preCommitedClasses    = document.getElementById("preCommitedClasses").value;

        var costPerStudent = calc.cost(desiredIncome, consumablesPerStudent, startupCost, maxStudentsPerClass, preCommitedClasses);
        document.getElementById('costResult').innerHTML = costPerStudent;
    }
};
