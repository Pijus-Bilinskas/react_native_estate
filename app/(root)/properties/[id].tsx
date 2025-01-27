import { View, Text, ScrollView, Dimensions, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { router, useLocalSearchParams } from 'expo-router'
import { useAppwrite } from '@/lib/useAppwrite';
import { getPropertyById } from '@/lib/appwrite';
import images from '@/constants/images';
import icons from '@/constants/icons';
import { facilities } from '@/constants/data';
import Comment from '@/components/Comment';

const Property = () => {
    const { id } = useLocalSearchParams<{ id?: string }>();

    const windowHeight = Dimensions.get("window").height

    const { data: property } = useAppwrite({
      fn: getPropertyById,
      params: {
        id: id!,
      }
    });

  return (
    <View>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerClassName='pb-32 bg-white'>
        <View className='relative w-full' style={{ height: windowHeight / 2 }}>
        <Image 
        source={{ uri: property?.image }}
        className='size-full'
        resizeMode='cover'
        />
        <Image 
        source={images.whiteGradient}
        className='absolute top-0 w-full z-40'
        />

        <View className='z-50 absolute inset-x-7'>
            <View className='flex flex-row items-center w-full justify-between'>
            <TouchableOpacity onPress={() => router.back()} className='flex flex-row bg-primary-200 rounded-full size-11 items-center justify-between'>
              <Image source={icons.backArrow} className='size-5' />
            </TouchableOpacity>

            <View className='flex flex-row items-center gap-3'>
              <Image
              source={icons.heart}
              className='size-7'
              tintColor={"#191D31"}
              />
              <Image source={icons.send} className='size-7' />
            </View>
          </View>
        </View> 
      </View>

      <View className='px-5 mt-7 gap-2'>
        <Text className='text-2xl font-rubik-extrabold'>
          {property?.name}
        </Text>

        <View className='flex flex-row items-center gap-3'>
          <View className='flex flex-row items-center px-4 py-2 bg-primary-100 rounded-full'>
            <Text className='text-black-200 text-sm mt-1 font-rubik-medium'>{property?.type}</Text>
          </View>

          <View className='flex flex-row items-center gap-2'>
            <Image source={icons.star} className='size-5' />
            <Text className='text-black-200 text-sm mt-1 font-rubik-medium'>{property?.rating} ({property?.reviews.length} reviews)</Text>
          </View>
        </View>

        <View className='flex flex-row items-center mt-5'>
          <View className='flex flex-row items-center justify-center bg-primary-100 rounded-full size-10 '>
            <Image source={icons.bed} className='size-4' />
          </View>
          <Text className='text-black-300 text-sm font-rubik-medium ml-2'>
            {property?.bedrooms} Beds
          </Text>
          <View className='flex flex-row items-center justify-center bg-primary-100 rounded-full size-10 ml-7'>
            <Image source={icons.bath} className='size-4' />
          </View>
          <Text className='text-black-300 text-sm font-rubik-medium ml-2'>
            {property?.bathrooms} Baths
          </Text>
          <View className='flex flex-row items-center justify-center bg-primary-100 rounded-full size-10 ml-7'>
            <Image source={icons.area} className='size-4' />
          </View>
          <Text className='text-black-300 text-sm font-rubik-medium ml-2'>
            {property?.area} sqft
          </Text>
        </View>

        <View className='w-full border-t border-primary-200 pt-7 mt-5'>
          <Text className='text-black-300 font-rubik-bold'>
            Agent
          </Text>

          <View className='flex flex-row items-center justify-between mt-4'>
            <View className='flex flex-row items-center'>
              <Image source={{ uri: property?.agent.avatar }} className='size-14 rounded-full' />

              <View className='flex flex-col items-start justify-center ml-3'>
                <Text className='text-lg text-black-300 text-start font-rubik-bold'>
                  {property?.agent.name}
                </Text>
                <Text className='text-sm text-black-200 text-start font-rubik-medium'>
                  {property?.agent.email}
                </Text>
              </View>
            </View>

            <View className='flex flex-row items-center gap-3'>
              <Image source={icons.chat} className='size-7' />
              <Image source={icons.phone} className='size-7' />
            </View>
          </View>
        </View>

        <View className='mt-7'>
          <Text className='text-black-300 text-xl font-rubik-bold'>
            Overview
          </Text>
          <Text className='text-black-200 text-base font-rubik mt-2'>
            {property?.description}
          </Text>
        </View>

        <View className='mt-7'>
          <Text className='text-black-300 text-xl font-rubik-medium'>
            Facilities
          </Text>

          {property?.facilities.length > 0 && (
            <View className='flex flex-row flex-wrap item-start justify-start mt-2 gap-5'>
              {property?.facilities.map((item: string, index: number) => {
                const facility = facilities.find(
                  (facility) => facility.title === item
                );

                return (
                  <View key={index} className='flex flex-1 flex-col items-center min-w-16 max-w-20'>
                    <View>
                      <Image source={facility ? facility.icon : icons.info} className='size-6' />
                    </View>

                    <Text numberOfLines={1} ellipsizeMode='tail' className='text-black-300 text-sm text-center font-rubik mt-1.5'>
                      {item}
                    </Text>
                  </View>
                )
              })}
            </View>
          )}
        </View>

        {property?.gallery.length > 0 && (
          <View>
            <Text className='text-black-300 text-xl font-rubik-bold'>
              Gallery
            </Text>
            <FlatList 
            contentContainerStyle={{ paddingRight: 20 }}
            data={property?.gallery}
            keyExtractor={(item) => item.$id}
            horizontal
            showsHorizontalScrollIndicator={false}
            renderItem={({ item }) => (
              <Image source={{ uri: item.image }} className='size-40 rounded-xl' />
            )}
            contentContainerClassName="flex gap-4 mt-3"
            />
          </View>
        )}

        <View className='mt-7'>
          <Text className='text-black-300 text-xl font-rubik-bold'>
            Location
          </Text>
          <View>
            <Image source={icons.location} className='w-7 h-7' />
            <Text className='text-black-200 text-sm font-rubik-medium'>
              {property?.address}
            </Text>
          </View>

          <Image source={images.map} className='h-52 w-full mt-5 rounded-xl' />
        </View>

        {property?.reviews.length > 0 && (
          <View className='mt-7'>
            <View className='flex flex-row items-center justify-between'>
              <View className='flex flex-row items-center'>
                <Image source={icons.star} className='size-6' />
                <Text>
                  {property?.rating} ({property?.reviews.lenght} reviews)
                </Text>
              </View>

              <TouchableOpacity>
                <Text className='text-primary-300 text-base font-rubik-bold'>
                  View All
                </Text>
              </TouchableOpacity>
            </View>

            <View>
              <Comment />
            </View>
          </View>
        )}
      </View>
      </ScrollView>

      <View className='absolute bg-white bottom-0 w-full rounded-t-2xl border-t border-l border-primary-200 p-7'>
        <View className='flex flex-row items-center justify-between gap-10'>
            <View className='flex flex-col items-start'>
              <Text className='text-black-200 text-xs font-rubik-medium'>
                Price
              </Text>
              <Text className='text-primary-300 text-start text-2xl font-rubik-bold' numberOfLines={1}>
                ${property?.price}
              </Text>
            </View>

            <TouchableOpacity className='flex-1 flex flex-row items-center justify-center bg-primary-300 py-3 rounded-full shadow-md shadow-zinc-400'>
              <Text className='text-white text-lg text-center font-rubik-bold'>Book Now</Text>
            </TouchableOpacity>
        </View>
      </View>
    </View>
  )
}

export default Property;