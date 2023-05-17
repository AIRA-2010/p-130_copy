left_wrist_x =0;
left_wrist_y =0;
scoreLeftWrist=0;
scoreRightWrist=0;
status_1 ="";
status_2="";
right_wrist_x =0;
right_wrist_y =0;
function preload(){
    song_1 = loadSound("music.mp3");
    song_2 = loadSound("music2.mp3");
}
function setup(){
    canvas = createCanvas(600,500);
    canvas.center();
    video = createCapture(VIDEO);
    video.hide();
    poseNet = ml5.poseNet(video,modelLoaded);
    poseNet.on('pose',gotPoses);
}
function modelLoaded(){
    console.log('model is loaded');
}
function gotPoses(results){
    if(results.length>0){
        console.log(results);
       left_wrist_x = results[0].pose.leftWrist.x;
       left_wrist_y = results[0].pose.leftWrist.y;
       right_wrist_x = results[0].pose.rightWrist.x;
       right_wrist_y = results[0].pose.rightWrist.y;
       console.log("leftWristX = "+left_wrist_x+" leftWristY = "+left_wrist_y+" rightWristX = "+right_wrist_x+" rightWristY = "+right_wrist_y);
       scoreLeftWrist = results[0].pose.keypoints[9].score;
       scoreRightWrist = results[0].pose.keypoints[10].score;
    }
}
function draw(){
    image(video,0,0,600,500);
    status_1=song_1.isPlaying();
    status_2=song_2.isPlaying();
    fill("red");
    stroke("red");
    if(scoreLeftWrist > 0.2){
        circle(left_wrist_x, left_wrist_y, 20); 
        song_2.stop();
        if(status_2 == false){
            song_1.play(); 
            document.getElementById("song_name").innerHTML ="SONG NAME = PETER PAN";
        }
    } 
    if(scoreRightWrist > 0.2){
        circle(right_wrist_x, right_wrist_y, 20);
        song_1.stop();
        if(status_1 == false){
            song_2.play(); 
            document.getElementById("song_name").innerHTML ="SONG NAME = HARRY POTTER THEME";
        }
    } 
}