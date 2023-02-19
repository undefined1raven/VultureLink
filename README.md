# Project Eagle

## Status:  

<h5 color="red">First Hover Test Failed</h5>
<h5 color="purple">Debugging Causes</h5>

## About
Project Eagle is a project I started 3 years ago with the purpose of building a custom UAV that could be remotely flown from anywhere with a reliable internet connection from both phones and desktops/laptops.

## Software
Since when I started this project I had no previous experience with web development, it took me a year of working on the web application for this project to get a solid skill set that includes working with HTML/CSS/JS, Node.JS and databases such as MongoDB and the Firebase Realtime DB. Considering the complexity of this web application, I then decided to use the Vue framework for a way better DX and efficiency level. From mid-2021 to the present moment I've been developing this app which now has the features needed to support real flights. With both the initial HTML/CSS/JS app and this one written in Vue, there was a learning curve I had to go through which affected my overall efficiency, but now with all the experience gained and better insights into how to manage the development of an application this complex, I think I could build features way faster. There are many other tools and APIs I've used to make this project work but I'm not going to mention them here since they're already presented in the technical documentation I've written for this project.

## The Vulture

### Hardware 
Figuring out which parts I needed to build this quad took me on a very enjoyable journey of learning about how UAVs work and how the different characteristics of each part changes the build overall. I decided it would be optimal for this application to use FPV Quad parts on a 7 inch frame that would allow me to maximize the metric I care most about - flight time.

Since the Vulture has to somehow connect with the rest of the web infrastructure meant to support Vulture Ops, I decided to skip on buying an off the shelf flight controller and to build one myself. The idea is to have full control over what the flight computer does so I could easily integrate the Vulture's capabilities with the rest of the infrastructure. For that reason, I decided to use a Resberry Pi 4 as a flight computer and multiple Ardunios as the Hardware Interface Boards. There are way more many details on how this works in the technical docs.

### Software
To have full control over what the Vulture's flight computer does is both a blessing and a curse. It's a blessing because it allows me to add at any point any sensors I'd like to (e.g sonars, LIDAR), but it comes at the cost of having to write the flight controller code from scratch, which has its risks. In essence what the flight controller has to do is simple, compare the current dynamic state of the Vulture that it gets from IMUs to the state that the pilot desires. This means at least a PID control loop is necessary for each axis and things get even more complex when talking about implementing autonomous features (which I'm planning on doing). Currently the biggest risk by far is getting the initial coefficients so wrong the Vulture would fall in a divergent control loop.(spiraling out of control ironically by the system trying to prevent that from happening). To prevent this from happening, I've disabled the I and D terms and added fully manual controls besides the basic proportional term. 

##### [currently updating the technical docs to reflect the latest state of this project]
