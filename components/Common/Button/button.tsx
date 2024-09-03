import React from 'react';
import { Text, TouchableOpacity, ActivityIndicator } from 'react-native';
import TextThemed from '../TextThemed';
interface CustomButtonProps {
  title: string;
  handlePress?: () => void;
  containerStyles?: string;
  textStyles?: string;
  isLoading?: boolean;
}

const CustomButton: React.FC<CustomButtonProps> = ({
  title,
  handlePress,
  containerStyles = '',
  textStyles = '',
  isLoading = false,
}) => {
  return (
    <TouchableOpacity
      className={` h-14 items-center justify-center rounded-full bg-orange-400 ${containerStyles} ${isLoading ? 'opacity-50' : ''}`}
      onPress={handlePress}
      activeOpacity={0.7}
      disabled={isLoading}>
      {isLoading ? (
        <ActivityIndicator color={'#fff'} />
      ) : (
        <TextThemed className={`text-white ${textStyles}`}>{title}</TextThemed>
      )}
    </TouchableOpacity>
  );
};

export default CustomButton;
