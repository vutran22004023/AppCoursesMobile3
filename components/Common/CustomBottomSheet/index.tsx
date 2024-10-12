import { StyleSheet, Text, View } from 'react-native';
import React, { forwardRef, useCallback, useMemo } from 'react';
import BottomSheet, { BottomSheetBackdrop } from '@gorhom/bottom-sheet';

const CustomBottomSheet = forwardRef((props: any, ref: any) => {
  const { children, isVisible, onClose} = props;

  const snapPoints = useMemo(() => ['85%'], []);

  const renderBackdrop = useCallback(
    (backdropProps: any) => (
      <BottomSheetBackdrop appearsOnIndex={0} disappearsOnIndex={-1} {...backdropProps} />
    ),
    []
  );

  return (
    <BottomSheet
      index={isVisible ? 0 : -1}
      ref={ref}
      snapPoints={snapPoints}
      enablePanDownToClose={true}
      backdropComponent={renderBackdrop}
      onClose={onClose}
      >
      {children}
    </BottomSheet>
  );
});

export default CustomBottomSheet;

const styles = StyleSheet.create({});
