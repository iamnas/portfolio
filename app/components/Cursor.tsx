'use client'
import React, { useRef, useState, useEffect } from 'react';
import { useEnsName, useEnsAvatar, useAccount } from 'wagmi';
import { useMouse, useWindowSize } from 'react-use';
import { trimAddress } from '../utils/address';
import Image from 'next/image'

const Cursor = () => {
    const [hasMounted, setMounted] = useState(false);
    const { width } = useWindowSize();
    const { address } = useAccount();
    const { data: ensName } = useEnsName({ address });
    const { data: ensAvatar } = useEnsAvatar({ name: address || "" });
    const [isVisible, setVisibility] = useState(false);
    const boxRef = useRef();
    const { elX, elY } = useMouse(boxRef);
    const isMobile = width <= 768;

    useEffect(() => {
        setMounted(true);
    }, []);

    useEffect(() => {
        if (boxRef.current) {
            setVisibility(!!(elX || elY));
        }
    }, [elX, elY, boxRef]);

    if (isMobile || !address || !hasMounted) return null;

    return (
        <div
            ref={boxRef}
            className="fixed top-0 left-0 w-full h-full pointer-events-none z-[9999] text-white text-sm uppercase"
        >
            <div
                className={`absolute flex items-center bg-white text-black rounded-xl shadow-md font-semibold px-3 py-1 transform ${isVisible ? 'opacity-100' : 'opacity-0'
                    }`}
                style={{
                    transform: `translate(${elX + 5}px, ${elY + 20}px)`,
                }}
            >
                {ensAvatar && (
                    <Image
                        className="w-4 h-4 rounded-full mr-2"
                        src={ensAvatar}
                        alt={address}
                    />
                )}
                {ensName || trimAddress(address)}
            </div>
        </div>
    );
};

export default Cursor;
