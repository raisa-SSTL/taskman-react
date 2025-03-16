# Project Setup Guide

Follow these steps to set up the project on your local machine:

## Prerequisites

Ensure you have the following installed on your machine:
* PHP (version 8.1 or higher)
* Composer
* Node.js (version 16 or higher) and npm
* MySQL or any other database server supported by Laravel
* Git
* A compatible web server (e.g., Apache or Nginx)

## Step 1: Clone the repository
1. Open a terminal and navigate to the directory where you want to clone the project.
2. Run the following command:
   ### `git clone https://github.com/raisa-SSTL/taskman-react.git`
3. Navigate to the project directory:
   ### `cd taskman-react`
## Step 2: Install Dependencies
1. Install JavaScript dependencies::
   ## `npm install`
2. Build frontend assets:
   ## `npm start`
   
The frontend will be accessible at the specified URL (e.g., http://localhost:3000).
The application supports two user roles: Admins and Employees. Set up the backend (taskman-api) to seed the default users.

## Key Features
✅ Dynamic Dashboards for both Admins and Employees
✅ Admin Dashboard: Task overviews (pending, upcoming, ongoing tasks), task analytics (assigned, unassigned), and task completion tracking (month and year wise), employee list for CRUD
✅ Employee Dashboard: Assigned task progress analytics, all-employee leaderboard, and personal productivity comparison over two months
✅ Data Visualization: Interactive bar charts, pie charts, and tables for analytical insights
✅ Task Management: Admins create and assign tasks, and employees update assigned tasks
✅ Admins can filter tasks according to priority and status





