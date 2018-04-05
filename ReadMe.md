# Farmland App

Farmland App

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

### Prerequisites

What things you need to get project up and running

```
nodejs https://nodejs.org/en/
```

### Installing dependencies

A step by step series of examples that tell you have to get a development env running

Open terminal

cd into repo

```
cd [folder name]
```

Install project dependencies

```
npm install
```

Install cordova (might need sudo if on linux based system)
```
npm install -g cordova
```


# Open project in xcode - OPTIONAL
```
open ./platforms/iosFarmLand.xcworkspace
```

# Setup for android build

Set the JAVA_HOME environment variable to the location of your JDK installation eg. "\Java\jdk1.8.0_161"
Set the ANDROID_HOME environment variable to the location of your Android SDK installation (android studio)
Set up an emulator in android or plug in android phone with usb debugging enabled.


# Setup for ios build

Download XCODE
Developer license required for distribution.
Plug in ios phone or use xcode emulator


# Running emulator

### Android
```
cordova emulate android
```

### ios
```
cordova emulate ios
```
or

Use xcode "Run" button to emulate


# Building the app

### Android
Create .apk for android
```
cordova build android
```

#### IOS
Create .app folder for ios
```
cordova build ios
```

Create .ipa for release
```
cordova build ios --release
```

or

Build using xcode "Run" button