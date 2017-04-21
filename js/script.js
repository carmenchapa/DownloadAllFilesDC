var downloadFilesModel = (function downloadFilesModel(){
	var file, fileData, basePath, form, elem = [];	
	
	var start = function(){
		if(checkParameters()){
			//alert('Nothing is missing!');
			//Comentario para git
			var arrayUrlAssets = prepareUrlAssets();
			var arrayHtmlElements = prepareHtmlElements(arrayUrlAssets);

		} else {
			alert('Something is missing!');
		}
	}

	var checkParameters = function (){
		var checked = false;
	 	file = document.getElementById("fileCSV").value;
		basePath = document.getElementById("folder-path").value;
		if((file !== "" && file !== undefined) && (basePath!== "" && basePath !== undefined)){	
			checked = true;
		}
		return checked;
	}

	var prepareUrlAssets = function(){
		//tendrias que llamar a una funcion para comprobar si la url es valida
		// y guardar la url comprobada 
		var finalBaseURL = basePath;
		var arrayAssets = getAssetsArray();
		return arrayAssets.map(function(val){
			return finalBaseURL + val;
		});		
	}
		
	var getAssetsArray = function(){
		var data = fileData;
		var dirtyData = data.split('\n');

		var newArray = dirtyData.map(function(val){
			
		 	var num=val.lastIndexOf(",");
			var first=val.substring(0,num);
			var slash=first.indexOf('/');
			var title=first.substring(slash + 1);

			console.log(title);
			return title;
		})
		return newArray;
  	};

    var prepareHtmlElements = function (arr){	
    	elem = [];
		for(i=0; i<arr.length; i++){
			elem.push($("<a>").attr("href", arr[i]).attr("download", "img.png", "img.jpg", "*.js").appendTo("body"))
		}	
	console.log(elem);	
	}

	var setFileData = function(data){
		fileData = data;
	}

	var downloadFiles =  function (){
		console.log("start download");
		for(i=0;i<elem.length;i++){
			elem[i][0].click();
		}
		//elem = [];
	}
	var removeAll = function (){
		for(i=0;i<elem.length;i++){
			elem[i].remove();
		}
	}

	return{
		start : start,
		downloadFiles : downloadFiles,
		removeAll : removeAll,
		setFileData : setFileData
	};
})();

document.getElementById('fileCSV').addEventListener('change', handleFileSelect, true);

function handleFileSelect(event){
	console.log("storing file");
	var file = event.target.files[0];
	var reader = new FileReader();
	reader.onload = function(event) {
		downloadFilesModel.setFileData(event.target.result);
	};
	reader.readAsText(file);
}

function download(){
	downloadFilesModel.start();	
	downloadFilesModel.downloadFiles();		
	downloadFilesModel.removeAll();
	
	document.getElementById("fileCSV").value = "";
	document.getElementById("file-path").value = "";
	document.getElementById("folder-path").value = "";

}
