. ./.env
cd ios
xcodebuild -exportArchive -archivePath ../tmp/ios/$PROJECTNAME.xcarchive -exportPath ../tmp/ios/ -exportOptionsPlist ./exportOptions.plist
cp ../tmp/ios/$PROJECTNAME.ipa ../download/$PROJECTNAME.ipa