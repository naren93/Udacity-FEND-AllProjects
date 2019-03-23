//"use strict";
/*
This is empty on purpose! Your code to build the resume will go here.
 */
//$("#main").append("Ram Subramanian");
//var oblivious = "I am Ramanathan and I am Awesome!!"
//console.log(oblivious);
//var funTot = oblivious.replace("Awesome","fun");
//console.log(funTot);
//$("#main").append(funTot);
//var firstName = "I am Ram and I am awesome";
//var age = 22;
//console.log(firstName);
//console.log(age);
//var awesomeTot="I am Ram and I am awesome";
//var funTot=awesomeTot.replace("awesome", "fun");
//$("#main").append(funTot);
//var formattedName = HTMLheaderName.replace("%data%","Ramanathan Subramanian");
//var formattedRole = HTMLheaderRole.replace("%data%","Web Developer");
//$("#header").prepend(formattedRole);
//$("#header").prepend(formattedName);
//var skillSet = ["Programming","Cognos", "PLSQL", "HTML"];
//var name = "Ramanathan Subramanian";
var bio = {
	"name" : "Ramanathan Subramanian",
	"role" : "Front-End Ninja",
	"age" : 22,
	"contacts" : {
		"mobile" : "+91-9677-810-123",
		"email" : "<a class=\"customA\" href= \"mailto:ramanathan.s.1993@gmail.com\">ramanathan.s.1993@gmail.com</a>",
		"github" : "<a class=\"customA\" href= \"https://github.com/naren93\">naren93</a>",
		"fb" : "<a class=\"customA\" href= \"https://www.facebook.com/naren.ramanathan.1\">Naren Ramanathan</a>",
		"location" : "No. 62, Asuri street, Tiruvallur, Chennai, India"
	},
	"welcomeMessage" : "Hello there! Welcome to my HomePage",
	"skills" : ["C/C++","Cognos BI", "PLSQL", "HTML", "ETL(DataStage)", "Python"],
	"biopic" : "images/fry.jpg"
};
var work = {"jobs": [
    {
        "employer": "United Engineering Industries",
        "title": "Engineer Trainee",
        "dates": "July, 12 (2014) to October, 13 (2014)",
        "expr": "3 months",
        "location": " United Engineering Industries, Thirumudivakkam, Tamil Nadu",
        "description": "Worked as trainee for a company that manufactures conveyors and press components for dish antenna - delegated work amongst machine work.jobsers for accomplishment of delivering the necessary products on a daily basis and tested motors and electrical equipment for quality"
    },
    {
        "employer": "Cognizant Technology Solutions",
        "title": "Programmer Analyst",
        "dates": "February, 17 (2015) - Present",
        "expr": "1+ (year(s))",
        "location": "Ramanujam IT City, Near tidel park,Taramani, Chennai, Tamil Nadu",
        "description": "Cognos Administrator in Enterprise Analytics Sustain team for Banking and Insurance Company"
    }
]};
//You should have multiple json objects for the for loop to work i guess!
var education = {"schools": [
    {
        "name": "Rajalakshmi Institute of Technology",
        "location": "Kuthambakkam Post, National Highway 4, Chembarambakkam, Chennai, Tamil Nadu",
        "degree": "Bachelor of Engineering",
        "majors": ["Electronics and Communication Engineering"],
        "dates": "June 15, 2010 - May 18, 2014 - Chennai, TN, IND",
        "url": "http://www.ritchennai.org"
    }
], "onlineCourses": [{
    "title": "Nanodegree on Front-End Development",
    "school": "Udacity",
    "date": "Oct-15 - Ongoing",
    "url": "https://www.udacity.com"
}], "display": function() {
        $("#education").append(HTMLschoolStart);
        for (var school in education.schools) {
        	//Formal Education
        	var formattedName = HTMLschoolName.replace("%data%", education.schools[school].name);
        	var formattedDegree = formattedName + " " + HTMLschoolDegree.replace("%data%", education.schools[school].degree);
        	var formattedDates = HTMLschoolDates.replace("%data%",education.schools[school].dates);
        	var formattedLocation = HTMLschoolLocation.replace("%data%", education.schools[school].location);
        	$(".education-entry").append(formattedDegree);
        	$(".education-entry").append(formattedDates);
        	$(".education-entry").append(formattedLocation);
        	for (var major in education.schools[school].majors){
        		var formattedMajor = HTMLschoolMajor.replace("%data%", education.schools[school].majors[major]);
        		$(".education-entry").append(formattedMajor);
        	}
        }
        //Online Courses
        $("#education").append(HTMLonlineClasses);
        for (var online in education.onlineCourses) {
        	var formattedTitle = HTMLonlineTitle.replace("%data%", education.onlineCourses[online].title);
        	//$(".education-entry").append(formattedTitle);
        	var formattedSchool = formattedTitle + " " +HTMLonlineSchool.replace("%data%", education.onlineCourses[online].school);
        	$(".online-entry").append(formattedSchool);
        	var formattedOnlineDates = HTMLonlineDates.replace("%data%", education.onlineCourses[online].date);
        	$(".online-entry").append(formattedOnlineDates);
        	var formattedURL = HTMLonlineURL.replace("%data%", education.onlineCourses[online].url);
        	$(".online-entry").append(formattedURL);
        }
    }
};
//Projects:
//sample json object
//"use strict";
var projects = {"project":[{
        "title": "<a href = \"Additional_Projs\\Uda-Proj-1-Portfolio\\design_mock_Portfolio.html\">Resume using HTML5, CSS3 and Bootstrap</a>",
        "dates": "Dec-15, 2015",
        "description": "To be filled",
        "images": ""
    },
    {
        "title": "<a href = \"Additional_Projs\\FE Nanodegree Project 0\\index.html\">Learning HTML</a>",
        "dates": "Nov-15, 2015",
        "description": "To be filled",
        "images": ""
    }],
    "display": function(){
        $("#projects").append(HTMLprojectStart);
        for (var pro in projects.project){
            var formattedTitle = HTMLprojectTitle.replace("%data%", projects.project[pro].title);
            var formattedDate = HTMLprojectDates.replace("%data%", projects.project[pro].dates);
            var formattedDescription = HTMLprojectDescription.replace("%data%", projects.project[pro].description);
            $(".project-entry:last").append(formattedTitle);
            $(".project-entry:last").append(formattedDate);
            $(".project-entry:last").append(formattedDescription);
            if(projects.project[pro].images.length > 0){
                for(var image in projects[1].images){
                    var formattedImage = HTMLprojectImage.replace("%data%", projects.project[pro].images[image]);
                    $(".project-entry:last").append(formattedImage);
                }
            }
        }
    }
};
//document.write(bio.skills.length);
bio.display = function(){
	HTMLheaderRole = HTMLheaderRole.replace("%data%", bio.role);
	$("#header").prepend(HTMLheaderRole);
	var formattedHTMLheaderName = HTMLheaderName.replace("%data%", bio.name + " ");
	$("#header").prepend(formattedHTMLheaderName);
	HTMLmobile = HTMLmobile.replace("%data%", bio.contacts.mobile);
	$(HTMLmobile).appendTo("#topContacts");
	HTMLemail = HTMLemail.replace("%data%", bio.contacts.email);
	$(HTMLemail).appendTo("#topContacts");
	//$("#topContacts").append(HTMLemail);
	var formattedGithub = HTMLgithub.replace("%data%", bio.contacts.github);
	$(formattedGithub).appendTo("#topContacts");
	var formattedtwitter = HTMLtwitter.replace("%data%", bio.contacts.fb);
	$(formattedtwitter).appendTo("#topContacts");
	var formattedlocation = HTMLlocation.replace("%data%", "Tiruvallur, Chennai, TN, IND");
	$(formattedlocation).appendTo("#topContacts");
	var formattedBioPic=HTMLbioPic.replace("%data%", bio.biopic);
	$("#header").append(formattedBioPic);
	var formattedwelcomeMsg=HTMLwelcomeMsg.replace("%data%", bio.welcomeMessage);
	$("#header").append(formattedwelcomeMsg);
	//Footer Contacts?
	$('#topContacts').children().clone().appendTo('#footerContacts');
	if(bio.skills.length > 0) {
		$("#header").append(HTMLskillsStart);
		var formattedSkill=HTMLskills.replace("%data%", bio.skills[0]);
		$("#skills").append(formattedSkill);
		formattedSkill=HTMLskills.replace("%data%", bio.skills[1]);
		$("#skills").append(formattedSkill);
		formattedSkill=HTMLskills.replace("%data%", bio.skills[2]);
		$("#skills").append(formattedSkill);
		formattedSkill=HTMLskills.replace("%data%", bio.skills[3]);
		$("#skills").append(formattedSkill);
		formattedSkill=HTMLskills.replace("%data%", bio.skills[4]);
		$("#skills").append(formattedSkill);
		formattedSkill=HTMLskills.replace("%data%", bio.skills[5]);
		$("#skills").append(formattedSkill);
	}
}
//initializing function call
bio.display();

//$("#work.jobsExperience").append(HTMLwork.jobsStart);
//var formattedEmployer = HTMLwork.jobsEmployer.replace("%data%", work.jobs.employer);
//var formattedTitle = HTMLwork.jobsTitle.replace("%data%", work.jobs.titleA);
//$(".work.jobs-entry").append(formattedEmployer + " " + formattedTitle);
//$(".work.jobs-entry").append(formattedTitle);
work.display = function(){
	$("#workExperience").append(HTMLworkStart);
	for(var job in work.jobs){
		var formattedEmployer = HTMLworkEmployer.replace("%data%", work.jobs[job].employer);
		var formattedTitle = HTMLworkTitle.replace("%data%", work.jobs[job].title);
		$(".work-entry").append(formattedEmployer + " " + formattedTitle);
		var formattedDate = HTMLworkDates.replace("%data%", work.jobs[job].dates);
		$(".work-entry").append(formattedDate);
		var formattedLocation = HTMLworkLocation.replace("%data%", work.jobs[job].location);
		$(".work-entry").append(formattedLocation);
		var formattedDescription = HTMLworkDescription.replace("%data%", work.jobs[job].description);
		$(".work-entry").append(formattedDescription);
		//console.log(work.jobs[job].employer + " " + work.jobs[job].titleA);
	}
}
work.display();
//using functions with parameters - Commenting them as i dont find them necessary!
/*$(document).click(function(loc) {
	var x = loc.pageX;
	var y = loc.pageY;
	logClicks(x,y);
});*/

//Display Projects:

projects.display();

//display Education:
education.display();
//Internationalise:
function inName(name){
	name = name.trim().split(" ");
	console.log(name);
	name[1] = name[1].toUpperCase();
	name[2] = name[0].slice(0,1).toUpperCase() + name[0].slice(1).toLowerCase();
	return name[0]+" "+name[1];
}
$("#main").append(internationalizeButton);
//I want map
$('#mapDiv').append(googleMap);