import * as React from 'react'
import {Text,View,TouchableOpacity,Image, StyleSheet} from 'react-native';
import {barCodeScanner} from 'expo-barcode-scanner';
import * as Permissions from 'expo-permissions'

export default class TransactionScreen extends React.Component{
constructor(){
    super();
    this.state={
        hasCameraPermissions: null,
        scanned:false,
        scannedData:'',
        buttonState: 'normal'
    }

}  
getCameraPermission=async()=>{
    const {status}=await Permissions.askAsync(Permissions.CAMERA) 
    this.setState({
        hasCameraPermissions: status==='granted',
        buttonState:'clicked'
    })
} 

handleBarCodeScanned=async({type, data})=>{
    this.setState({
        scanned:true,
        scannedData: data,
        buttonState: 'normal'
    })
}
render(){
    const hasCameraPermissions=this.state.hasCameraPermissions
    const buttonState= this.state.buttonState
    const scanned=this.state.scanned

    if(buttonState==='clicked'&& hasCameraPermissions){
        return(
            <barCodeScanner
            onBarCodeScanned={scanned? undefined : this.handleBarCodeScanned}
            style={StyleSheet.absoluteFillObject}/>
        )
    }
    else if(buttonState==='normal'){
return(
<View>

<TouchableOpacity style={styles.scanbutton}
    onPress={this.getCameraPermission} title ="Bar Code Scanner">
        <Text style={styles.buttonText}>
            Scan QR Code
        </Text>
    </TouchableOpacity>
</View>

)
    }







}

}