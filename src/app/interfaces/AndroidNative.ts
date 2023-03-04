export interface WebAppInterface {
    getAppId() : string;
    getVersion() : string;
    stopMediaPlayer() : void; 
    getEntryState() :boolean;
    replaceAlarmState() :void;
    getMessageBody() : string;
    onClickVideo(id, user, pass);
    getDeviceList();
    addDeviceInAdmin(devId, userName, pass);
    wifiAccess();
}