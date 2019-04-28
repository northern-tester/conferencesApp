# conferences-app v0.0.0



- [Auth](#auth)
	- [Authenticate](#authenticate)
	
- [Conference](#conference)
	- [Create conference](#create-conference)
	- [Delete conference](#delete-conference)
	- [Retrieve conference](#retrieve-conference)
	- [Retrieve conferences](#retrieve-conferences)
	- [Update conference](#update-conference)
	
- [Session](#session)
	- [Create session](#create-session)
	- [Delete session](#delete-session)
	- [Retrieve session](#retrieve-session)
	- [Retrieve sessions](#retrieve-sessions)
	- [Update session](#update-session)
	
- [Speaker](#speaker)
	- [Create speaker](#create-speaker)
	- [Delete speaker](#delete-speaker)
	- [Retrieve speaker](#retrieve-speaker)
	- [Retrieve speakers](#retrieve-speakers)
	- [Update speaker](#update-speaker)
	
- [User](#user)
	- [Create user](#create-user)
	- [Delete user](#delete-user)
	- [Retrieve current user](#retrieve-current-user)
	- [Retrieve user](#retrieve-user)
	- [Retrieve users](#retrieve-users)
	- [Update password](#update-password)
	- [Update user](#update-user)
	


# Auth

## Authenticate



	POST /auth

### Headers

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| Authorization			| String			|  <p>Basic authorization with email and password.</p>							|

### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| access_token			| String			|  <p>Master access_token.</p>							|

# Conference

## Create conference



	POST /conferences


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| access_token			| String			|  <p>user access token.</p>							|
| name			| 			|  <p>Conference's name.</p>							|
| date			| 			|  <p>Conference's date.</p>							|
| country			| 			|  <p>Conference's country.</p>							|
| length			| 			|  <p>Conference's length.</p>							|
| tutorials			| 			|  <p>Conference's tutorials.</p>							|
| workshops			| 			|  <p>Conference's workshops.</p>							|

## Delete conference



	DELETE /conferences/:id


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| access_token			| String			|  <p>user access token.</p>							|

## Retrieve conference



	GET /conferences/:id


## Retrieve conferences



	GET /conferences


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| q			| String			| **optional** <p>Query to search.</p>							|
| page			| Number			| **optional** <p>Page number.</p>							|
| limit			| Number			| **optional** <p>Amount of returned items.</p>							|
| sort			| String[]			| **optional** <p>Order of returned items.</p>							|
| fields			| String[]			| **optional** <p>Fields to be returned.</p>							|

## Update conference



	PUT /conferences/:id


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| access_token			| String			|  <p>user access token.</p>							|
| name			| 			|  <p>Conference's name.</p>							|
| date			| 			|  <p>Conference's date.</p>							|
| country			| 			|  <p>Conference's country.</p>							|
| length			| 			|  <p>Conference's length.</p>							|
| tutorials			| 			|  <p>Conference's tutorials.</p>							|
| workshops			| 			|  <p>Conference's workshops.</p>							|

# Session

## Create session



	POST /sessions


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| access_token			| String			|  <p>user access token.</p>							|
| title			| 			|  <p>Session's title.</p>							|
| keywords			| 			|  <p>Session's keywords.</p>							|
| description			| 			|  <p>Session's description.</p>							|
| conference			| 			|  <p>Session's conference.</p>							|
| type			| 			|  <p>Session's type.</p>							|
| day			| 			|  <p>Session's day.</p>							|

## Delete session



	DELETE /sessions/:id


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| access_token			| String			|  <p>user access token.</p>							|

## Retrieve session



	GET /sessions/:id


## Retrieve sessions



	GET /sessions


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| q			| String			| **optional** <p>Query to search.</p>							|
| page			| Number			| **optional** <p>Page number.</p>							|
| limit			| Number			| **optional** <p>Amount of returned items.</p>							|
| sort			| String[]			| **optional** <p>Order of returned items.</p>							|
| fields			| String[]			| **optional** <p>Fields to be returned.</p>							|

## Update session



	PUT /sessions/:id


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| access_token			| String			|  <p>user access token.</p>							|
| title			| 			|  <p>Session's title.</p>							|
| keywords			| 			|  <p>Session's keywords.</p>							|
| description			| 			|  <p>Session's description.</p>							|
| conference			| 			|  <p>Session's conference.</p>							|
| type			| 			|  <p>Session's type.</p>							|
| day			| 			|  <p>Session's day.</p>							|

# Speaker

## Create speaker



	POST /speakers


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| access_token			| String			|  <p>user access token.</p>							|
| name			| 			|  <p>Speaker's name.</p>							|
| nationality			| 			|  <p>Speaker's nationality.</p>							|
| country			| 			|  <p>Speaker's country.</p>							|
| speciality			| 			|  <p>Speaker's speciality.</p>							|
| biography			| 			|  <p>Speaker's biography.</p>							|

## Delete speaker



	DELETE /speakers/:id


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| access_token			| String			|  <p>user access token.</p>							|

## Retrieve speaker



	GET /speakers/:id


## Retrieve speakers



	GET /speakers


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| q			| String			| **optional** <p>Query to search.</p>							|
| page			| Number			| **optional** <p>Page number.</p>							|
| limit			| Number			| **optional** <p>Amount of returned items.</p>							|
| sort			| String[]			| **optional** <p>Order of returned items.</p>							|
| fields			| String[]			| **optional** <p>Fields to be returned.</p>							|

## Update speaker



	PUT /speakers/:id


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| access_token			| String			|  <p>user access token.</p>							|
| name			| 			|  <p>Speaker's name.</p>							|
| nationality			| 			|  <p>Speaker's nationality.</p>							|
| country			| 			|  <p>Speaker's country.</p>							|
| speciality			| 			|  <p>Speaker's speciality.</p>							|
| biography			| 			|  <p>Speaker's biography.</p>							|

# User

## Create user



	POST /users


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| access_token			| String			|  <p>Master access_token.</p>							|
| email			| String			|  <p>User's email.</p>							|
| password			| String			|  <p>User's password.</p>							|
| name			| String			| **optional** <p>User's name.</p>							|
| picture			| String			| **optional** <p>User's picture.</p>							|
| role			| String			| **optional** <p>User's role.</p>							|

## Delete user



	DELETE /users/:id


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| access_token			| String			|  <p>User access_token.</p>							|

## Retrieve current user



	GET /users/me


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| access_token			| String			|  <p>User access_token.</p>							|

## Retrieve user



	GET /users/:id


## Retrieve users



	GET /users


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| access_token			| String			|  <p>User access_token.</p>							|
| q			| String			| **optional** <p>Query to search.</p>							|
| page			| Number			| **optional** <p>Page number.</p>							|
| limit			| Number			| **optional** <p>Amount of returned items.</p>							|
| sort			| String[]			| **optional** <p>Order of returned items.</p>							|
| fields			| String[]			| **optional** <p>Fields to be returned.</p>							|

## Update password



	PUT /users/:id/password

### Headers

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| Authorization			| String			|  <p>Basic authorization with email and password.</p>							|

### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| password			| String			|  <p>User's new password.</p>							|

## Update user



	PUT /users/:id


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| access_token			| String			|  <p>User access_token.</p>							|
| name			| String			| **optional** <p>User's name.</p>							|
| picture			| String			| **optional** <p>User's picture.</p>							|


