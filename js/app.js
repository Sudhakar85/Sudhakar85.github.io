$(document).ready(function(){    
    getAllProjects();
});

function getAllProjects() {
     $.get("data/projects.json", function(data) {        
        var projectUl = $('.fa-ul');
        $.each(data, function(index,project){
            var li = '<div class="row"><div class="col-md-12"><li class="project"><i class="fa-li fa fa-square"></i><h4>'+project.name + '</h4><div>'+project.description +
            '</div><a href="'+ project.url + '">Repository</a></li></div></div>';
            $(projectUl).append(li);
        })
     });
}   