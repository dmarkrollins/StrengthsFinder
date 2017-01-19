
angular.module('FormCtrl', []).controller('FormController', function ($scope) {

		$scope.backcolor = "#fff";
		$scope.opacity = "opacity: 0;";
		$scope.strategycolor = "#666";
		$scope.colorboxclass = "hidden";
		$scope.colors = {}; //{ executing: 0, influencing: 0, relationship: 0, strategic: 0 };

		$scope.scoretext = [
			{
				type: "execute",
				score: "40",
				text: "This is the team that will work tirelessly, consistently, predictably to bring an idea to life and who you turn to time and time again when planning to and executing on a specific end goal is paramount to the success of your endeavor."
			},
			{
				type: "execute",
				score: "25",
				text: "Planning and execution are this team’s strong suits. Turn to this group when action is needed and immediate results required."
			},
			{
				type: "execute",
				score: "0",
				text: "This team can identify the stepping stones needed to reach success."
			},
			{
				type: "influence",
				score: "40",
				text: "This group has a natural ability to spread the word, sway opinion, and communicate complex ideas in simple terms excelling in a marketing, public relations or sales role where clear communication is considered a strategic advantage."
			},
			{
				type: "influence",
				score: "25",
				text: "This team has a knack for communicating their progress directly in clear terms, keeping everyone in the loop."
			},
			{
				type: "influence",
				score: "0",
				text: "This group has the ability to clearly communicate progress and direction."
			},
			{
				type: "relationship",
				score: "40",
				text: "Cohesiveness is fundamental to this energized group who excel at staying focused on a directive and can deliver complex projects and reach challenging organizational objectives."
			},
			{
				type: "relationship",
				score: "25",
				text: "This group has strong team dynamics and will succeed when challenged where other groups with less cohesiveness may not perform as well."
			},
			{
				type: "relationship",
				score: "0",
				text: "This team's sense of identity may help it stay focused."
			},
			{
				type: "strategic",
				score: "40",
				text: "With the end goal in mind, this team will focus a vision of future state or direction given available information and probable upcoming challenges, then drive change that aligns to this desired organizational end state."
			},
			{
				type: "strategic",
				score: "25",
				text: "Future focused and analytical, this team is sensitive to upcoming challenges and will facilitate and adapt well to organizational change."
			},
			{
				type: "strategic",
				score: "0",
				text: "This team can be analytical and forward thinking."
			},
		];

		$scope.radardata = {
			labels: ["Executing", "Influencing", "Relationship", "Strategic"],
	    datasets: [
	        {
	            label: "Team Profile",
	            fillColor: "rgba(220,220,220,0.2)",
	            strokeColor: "rgba(220,220,220,1)",
	            pointColor: "rgba(220,220,220,1)",
	            pointStrokeColor: "#fff",
	            pointHighlightFill: "#fff",
	            pointHighlightStroke: "rgba(220,220,220,1)",
	            data: [65, 59, 90, 81, 56, 55, 40]
	        }
	    ]
		}

		$scope.format = function(format) {
	    var args = Array.prototype.slice.call(arguments, 1);
	    return format.replace(/{(\d+)}/g, function(match, number) {
	      return typeof args[number] != 'undefined'
	        ? args[number]
	        : match
	      ;
	    });
	  }

		$scope.componentToHex = function (c) {
    	var hex = c.toString(16);
    	return hex.length == 1 ? "0" + hex : hex;
		}

		$scope.rgbToHex = function(r, g, b) {
		    return "#" + $scope.componentToHex(r) + $scope.componentToHex(g) + $scope.componentToHex(b);
		}

		//alert( rgbToHex(0, 51, 255) );

    $scope.Calculate = function (colors) {

			var rgbx = new RGBX(colors.executing, colors.influencing, colors.relationship, colors.strategic);

			$scope.backcolor = $scope.rgbToHex(rgbx.r, rgbx.g, rgbx.b).toUpperCase();
			$scope.opacity = .4;
			var grayval = 255 - Math.round(rgbx.a * 100);
			$scope.strategycolor = $scope.rgbToHex(grayval, grayval, grayval);

			$scope.radardata.datasets[0].data = [colors.executing , colors.influencing , colors.relationship , colors.strategic ];

			$('#profile').html($scope.GetProfileText(colors));

			$scope.colorboxclass = "show";

			var ctx = document.getElementById("chart-area").getContext("2d");
			var chrt = new Chart(ctx).Radar($scope.radardata);

			$('#sftabs a[href="#profile"]').tab('show')

		}

		$scope.GetProfileText = function(colors){

			var profiletext = "<ul>";

			var total = colors.executing + colors.influencing + colors.relationship + colors.strategic;

			var score = Math.round(colors.executing / total * 100);
			profiletext +=  $scope.FindText("execute", score);

			var score = Math.round(colors.influencing / total * 100);
			profiletext +=  $scope.FindText("influence", score);

			var score = Math.round(colors.relationship / total * 100);
			profiletext +=  $scope.FindText("relationship", score);

			var score = Math.round(colors.strategic / total * 100);
			profiletext +=  $scope.FindText("strategic", score);

			profiletext += "</ul>";

			return profiletext;

		}

		$scope.FindText = function(key, score){
			var arrayLength = $scope.scoretext.length;
			if(score == 0){
				return "";
			}
			else{
				for (var i = 0; i < arrayLength; i++) {
					if($scope.scoretext[i].type == key && $scope.scoretext[i].score < score){
						return "<li>" + $scope.scoretext[i].text + "</li>";
					}
				}
			}
		}

});
