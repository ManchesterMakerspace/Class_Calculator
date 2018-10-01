// classCalc.js ~ Copyright 2018 Manchester Makerspace ~ MIT License

var calc = {
    cost: function(desiredIncome, consumablesPerStudent, startup, studentsPerClass, preCommitedClasses){
        preCommitedClasses = preCommitedClasses ? preCommitedClasses : 1; // theres always at least one class to commit to
        var deferredStartupRate = 0;                                      // given no start up cost, cost is zero
        if(startup){
            deferredStartupRate = startup / studentsPerClass / preCommitedClasses;
        } // deffered startup cost over time based on classes teacher is willing to commit to
        var materialsPerClass = (deferredStartupRate + consumablesPerStudent) * studentsPerClass;
        var totalIncome = desiredIncome * 2;                              // assuming 50/50 cut when non members sign up
        var totalClassCost = totalIncome + materialsPerClass;
        var costPerStudent = totalClassCost / studentsPerClass;
        console.log('cost per student minus start: $' + totalIncome / studentsPerClass + consumablesPerStudent);
        return costPerStudent;
    },
    eventbrite: function(costPerStudent){
        var percent = costPerStudent * 0.06;
        return costPerStudent + percent + 1.59;
    },
    submitAction: function(){
        var desiredIncome         = document.getElementById('desiredIncome').value;
        var consumablesPerStudent = document.getElementById('consumablesPerStudent').value;
        var startupCost           = document.getElementById('startup').value;
        var maxStudentsPerClass   = document.getElementById('maxStudentsPerClass').value;
        var minStudentsPerClass   = document.getElementById('minStudentsPerClass').value;
        var preCommitedClasses    = document.getElementById("preCommitedClasses").value;

        var costPerStudent = calc.cost(desiredIncome, consumablesPerStudent, startupCost, minStudentsPerClass, preCommitedClasses);
        var discountAmount = costPerStudent * 0.25;
        var costPerMember = costPerStudent - discountAmount;
        document.getElementById('memberCost').innerHTML = costPerMember.toFixed(2);
        document.getElementById('ebCostMember').innerHTML = calc.eventbrite(costPerMember).toFixed(2);
        document.getElementById('studentCost').innerHTML = costPerStudent.toFixed(2);
        document.getElementById('ebCost').innerHTML = calc.eventbrite(costPerStudent).toFixed(2);

        var OPcostPerStudent = calc.cost(desiredIncome, consumablesPerStudent, startupCost, maxStudentsPerClass, preCommitedClasses);
        var OPdiscountAmount = OPcostPerStudent * 0.25;
        var OPcostPerMember = OPcostPerStudent - OPdiscountAmount;

        document.getElementById('OPmemberCost').innerHTML = OPcostPerMember.toFixed(2);
        document.getElementById('OPebCostMember').innerHTML = calc.eventbrite(OPcostPerMember).toFixed(2);
        document.getElementById('OPstudentCost').innerHTML = OPcostPerStudent.toFixed(2);
        document.getElementById('OPebCost').innerHTML = calc.eventbrite(OPcostPerStudent).toFixed(2);
    }
};
