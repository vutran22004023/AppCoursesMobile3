import React from 'react';
import { Image, Text, TouchableOpacity } from 'react-native';
interface CustomButtonProps {
  icon: any;
  handlePress: () => void;
  containerStyles?: string; // Type string for containerStyles
  textStyles?: string; // Type string for textStyles
  isLoading?: boolean;
}

const CustomButtonIcon: React.FC<any> = ({
  icon,
  handlePress,
  containerStyles = '', // Provide a default empty string
  isLoading = false, // Provide a default value
}) => {
  return (
    <TouchableOpacity
      className={` rounded-2xl items-center justify-center bg-orange-400 h-14 w-[70px] ${containerStyles} ${isLoading ? 'opacity-50' : ''}`}
      onPress={handlePress}
      activeOpacity={0.7}
    >
      <Image source={icon} className='w-9 h-10' resizeMode='contain' style={{ tintColor: '#fff' }}/>
    </TouchableOpacity>
  );
};

export default CustomButtonIcon;
