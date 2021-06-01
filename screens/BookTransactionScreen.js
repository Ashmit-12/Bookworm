import React from 'react';
import { Text, View,TouchableOpacity,StyleSheet } from 'react-native';
import {BarCodescanner} from 'expo-barcode-scanner';
import * as Permissions from 'expo-permissions';
export default class TransactionScreen extends React.Component {
    
  constructor(){
    super()
    this.state={
      hasCameraPermission:false,
      scanned:false,
      scannedData:'',
      buttonState:'normal'

    }
  }
getCamerPermission=async()=>{
  const {status}= await Permissions
  .askAsync(Permissions.CAMERA)
  //status==='granted' is true if the user has given permission
  // status==='greanted' is false if the user has not given pernission 
this.setState({
    hasCameraPermission:status==="granted",
    scanned:false,
    buttonState:'clicked'
  })

}
handleBarCodeScaned=async({type,data})=>{
this.setState({
  scanned:true,
  scannedData:data,
  buttonState:'normal'
})
}

  render() {
    const hasCameraPermission=this.state.hasCameraPermission
    const scanned= this.state.scanned
    const buttonState=this.state.buttonState
    if( buttonState==='clicked'&& hasCameraPermission){
return(
  <BarCodescanner onBarCodeScanned={
    scanned? undefined : this.handleBarCodeScaned
  }
  style={StyleSheet.absoluteFillObject}
  />
)
    }
    else if(buttonState==='normal'){    
      return (
        <View style={styles.container}>
          <Text style={styles.displayText}>{hasCameraPermission===true? this.state.scannedData: 'request camera permission'}</Text>        
<TouchableOpacity style={styles.scanButton} onPress={this.getCamerPermission}>
  <Text style={styles.buttonText}>scan QR code</Text>
</TouchableOpacity>
        </View>
      );
    }
  }
}
const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center'
    },
    displayText:{
      fontSize: 15,
      textDecorationLine: 'underline'
    },
    scanButton:{
      backgroundColor: '#2196F3',
      padding: 10,
      margin: 10
    },
    buttonText:{
      fontSize: 20,
    }
  });