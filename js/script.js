    $(document).ready(function(){
    // the "href" attribute of .modal-trigger must specify the modal ID that wants to be triggered
    $('.modal').modal();
  });


var downloadFilesModel = (function downloadFilesModel(){
	var file, fileData, basePath, form, elem = [];	
	
	var start = function(){
		if(checkParameters()){
			//alert('Nothing is missing!');
			//Comentario para git

			var arrayUrlAssets = prepareUrlAssets();
			console.log(arrayUrlAssets);
			var arrayHtmlElements = prepareHtmlElements(arrayUrlAssets);

		} else {
			alert('Something is missing!');
		}
	}

	var checkParameters = function (){
		var checked = true;
	 	file = document.getElementById("fileCSV").value;
		//basePath = document.getElementById("folder-path").value;
		if((file !== "" && file !== undefined) && (basePath!== "" && basePath !== undefined)){	
			checked = true;
		}
		return checked;
	}

	var prepareUrlAssets = function(){
		var finalArray = [];
		var arrayBaseURL = getUrlsArray();
		var arrayAssets = getAssetsArray();
		arrayAssets.forEach(function(val, i){
				finalArray.push(arrayBaseURL[i] + val);
		});	
		console.log(finalArray);
		return finalArray;		
	}

	var getDirtyData = function(){
		var data = fileData;
		var dirtyData = data.split('\n');
		dirtyData.pop();
		console.log(dirtyData);
		return dirtyData;
	}

	var getUrlsArray = function(){
		function getPathUrl(bannerSize){
			if(bannerSize){
					return document.getElementById("path-" + bannerSize).value;
			}
		}
		var newArray = getDirtyData().map(function(val){
					var slash = val.indexOf('/');
					var folder = val.substring(0, slash);
					console.log(folder);
					return getPathUrl(folder);
		})
		console.log(newArray);
		return newArray;
	}
		
	var getAssetsArray = function(){
		var newArray = getDirtyData().map(function(val){			
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

	var popUpScript = function (){

		//sorting folders script
		var dirLine;
		var firstLine = '<span>for f in **.*; do<br>&nbsp;wf=`mdls -name kMDItemWhereFroms -raw "${f}" | sed \'2!d\'`<br>';
		var dirLine1 =  '&nbsp;dir=`echo $wf | sed -e \'s/"https:&#92;/&#92;/s0.2mdn.net&#92;/creatives&#92;/assets&#92;///\' -e \'s/&#92;/[^&#92;/]*$//\'`<br>';
		var dirLine2 = '&nbsp;dir=`echo $wf | sed -e \'s/"https:&#92;/&#92;/s0.2mdn.net&#92;/ads&#92;/richmedia&#92;/studio&#92;///\' -e \'s/&#92;/[^&#92;/]*$//\'`<br>';

		var endLines = '&nbsp;name=`echo "$f"|sed \'s/ (.)//\'`<br>&nbsp;mkdir -p "$dir"<br>&nbsp;mv "$f" "$dir"/"$name"<br>done</span>';

		//renaming folders script
		var inputs = document.querySelectorAll('input:not(.file)');
		console.log(inputs);

		var renamingArray = [];
		Array.prototype.forEach.call(inputs, function(val, i){
			var path = val.value;
			var arr = path.split("/");
			var folder = arr[arr.length - 2];
			var size = val.id.substring(5);
			console.log(arr.length);
			var script = "mv " + folder + " " + size + " |";
			console.log("mv " + folder + " " + size + " |");

			if(arr.length === 7){
				dirLine = dirLine1;				
			}else if(arr.length === 8){
				dirLine = dirLine2;				
			}

			if (path !==""){
				renamingArray.push(script);
			}
		})
		var renamingString = renamingArray.join(" ");
		var renamingFolders = renamingString.substring(0, renamingString.length -2);
		console.log(renamingFolders);


		var command = firstLine + dirLine + endLines + '<br>' + renamingFolders;

		$('.command').html(command);
			console.log('here');
		$('.modal-trigger').click();
	}

	var cleaning = function(){
		var foldersIds = ['120x600', '160x600', '300x250', '300x50', '300x600', '320x50', '468x60', '728x90', '970x250', 'DATA'];
		foldersIds.forEach(function(val,i){
			document.getElementById('path-' + val).value = "";
		})
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
		setFileData : setFileData,
		cleaning : cleaning,
		popUpScript : popUpScript
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
	downloadFilesModel.popUpScript();
	
	document.getElementById("fileCSV").value = "";
	document.getElementById("file-path").value = "";
	downloadFilesModel.cleaning();
	//document.getElementById("folder-path-1").value = "";

}
