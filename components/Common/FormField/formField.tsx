import React,{useState} from 'react'
import {icons} from '@/constants'
import { Image, Text, TextInput, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import TextThemed from '../TextThemed';
import { useThemeColor } from '@/hooks/useThemeColor';
interface IProps {
    lightColor?: string;
    darkColor?: string;
    title: string;
    value: string |undefined;
    placeholder: string;
    handleChangeText: (text: string) => void;
    otherStyles?: string;
    [key: string]: any; // Để chấp nhận các thuộc tính khác nếu cần
  }

  const FormField: React.FC<IProps> = ({ title, value, placeholder, handleChangeText, otherStyles,lightColor,darkColor, ...props }) => {
    const bg = useThemeColor({ light: lightColor, dark: darkColor }, 'background');
    const border = useThemeColor({ light: lightColor, dark: darkColor }, 'border');
    const text = useThemeColor({ light: lightColor, dark: darkColor }, 'text');
    const [isFocused, setIsFocused] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  
    return (
      <View className={`space-y-1 ${otherStyles}`}>
        <TextThemed className='mb-2'>{title}</TextThemed>
        <View className={`w-full h-14 px-4 ${bg} rounded-2xl flex-row items-center border-2 ${isFocused ? 'border-orange-400' : border}`}>
          <TextInput
            className={` flex-1 font-psemibold text-base`}
            style={{color: text}}
            value={value}
            placeholder={placeholder}
            placeholderTextColor="#7b7b8b"
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            onChangeText={handleChangeText}
            secureTextEntry={(title === 'Password' && !showPassword) || (title === 'Mật khẩu' && !showPassword) || (title === 'ConfirmPassword' && !showConfirmPassword) || (title === 'Xác nhận mật khẩu' && !showConfirmPassword)}
            {...props}
          />
          {title ==='Password' && (
            <TouchableOpacity onPress={()=>
              setShowPassword(!showPassword)
            }>
              <Image source={!showPassword ? icons.eye : icons.eyeHide } className="w-6 h-6" resizeMode='contain'/>
            </TouchableOpacity>
          )}
          {title ==='Mật khẩu' && (
            <TouchableOpacity onPress={()=>
              setShowPassword(!showPassword)
            }>
              <Image source={!showPassword ? icons.eye : icons.eyeHide } className="w-6 h-6" resizeMode='contain'/>
            </TouchableOpacity>
          )}
          {title === 'ConfirmPassword' && (
            <TouchableOpacity onPress={() => setShowConfirmPassword(!showConfirmPassword)}>
              <Image
                source={!showConfirmPassword ? icons.eye : icons.eyeHide}
                className="w-6 h-6"
                resizeMode="contain"
              />
            </TouchableOpacity>
          )}
          {title === 'Xác nhận mật khẩu' && (
            <TouchableOpacity onPress={() => setShowConfirmPassword(!showConfirmPassword)}>
              <Image
                source={!showConfirmPassword ? icons.eye : icons.eyeHide}
                className="w-6 h-6"
                resizeMode="contain"
              />
            </TouchableOpacity>
          )}
        </View>
      </View>
    );
  };
  
  export default FormField