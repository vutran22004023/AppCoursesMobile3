import { StyleSheet, Text, View } from 'react-native';
import React, { forwardRef, useCallback, useMemo } from 'react';
import BottomSheet, { BottomSheetBackdrop, BottomSheetView, BottomSheetModal } from '@gorhom/bottom-sheet';
import { GestureHandlerRootView } from 'react-native-gesture-handler'; 

const CustomBottomSheet = forwardRef((props: any, ref: any,) => {
  const { children, index} = props;
  
  const snapPoints = useMemo(() => ['70%',"100%"], []);

  const renderBackdrop = useCallback(
    (backdropProps: any) => <BottomSheetBackdrop appearsOnIndex={0} disappearsOnIndex={-1} {...backdropProps} />,
    []
  );

  return (
    <BottomSheetModal
      index={index}
      ref={ref}
      snapPoints={snapPoints}
      enablePanDownToClose={true}
      backdropComponent={renderBackdrop}
      backgroundStyle={{backgroundColor: '#161622'}}
      handleIndicatorStyle={{backgroundColor: '#161622'}}
    >
      {children}
    </BottomSheetModal>
  );
});

export default CustomBottomSheet;

const styles = StyleSheet.create({});
