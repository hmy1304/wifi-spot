import React, {useEffect, useRef} from 'react'
import useKakaoLoader from '../hook/useKakaoLoader'

const MapView = ({selectedSpot,spots=[]}) => {
    const mapRef = useRef(null)
    const mapInstanceRef = useRef(null)
    const markersRef = useRef([])
    const infoRef = useRef(null)
    const {ready} = useKakaoLoader()

    useEffect(()=>{
        if(!ready) return

        if(mapInstanceRef.current) return

        if(!mapRef.current) return

        window.kakao.maps.load(()=> {
            const center = new window.kakao.maps.LatLng(37.5665, 126.978)
            const map = new window.kakao.map.Map(mapRef.current, {
                center,
                level:5
            })
            mapInstanceRef.current=map

            infoRef.current = new window.kakao.maps.InfoWindow({
                zIndex:10,
                removeable:true
            })
        })
    },[ready])

    useEffect(()=> {
        if(!ready || !mapInstanceRef.current || !window.kakao?.maps)
            return
        const map = mapInstanceRef.current

        markersRef.current.forEach((m)=>m.setMap(null))

        markersRef.current = []

        if(!spots.length) return

        spots.forEach((spot)=>{
            if(!spot.lat || !spot.lng) return

            const position = new window.kakao.maps.LatLng(
                Number(spot.lat),
                Number(spot.lng)
            )
            const marker = new window.kakao.maps.Marker({
                position,
                map
            })

            markersRef.current.push(marker)
        })
    },[ready, spots])

    return <div ref={mapRef} className='w-full h-full'/>
}

export default MapView