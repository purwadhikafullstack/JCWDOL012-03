'use client';

import React, { useEffect, useState } from 'react';
import avatarIcon from '../../../public/assets/avatar.png';
import { Button } from '@/components/ui/button';
import { getSessionClient } from '@/services/client';
import { Form } from '@/components/ui/form';
import { Card } from '@/components/ui/card';
import Image from 'next/image';
import axios from 'axios';

interface ProfileProps {
  sessionCookie?: string;
}

export function AvatarForm(props: ProfileProps) {
  const { sessionCookie } = props;

  const [sessionData, setSessionData] = useState<any>({});
  const [avatar, setAvatar] = useState<File | null>(null);
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);

  useEffect(() => {
    getSessionClient(sessionCookie).then((data) => {
      if (data) setSessionData(data);
    });
  }, [sessionCookie]);

  const handleAvatarChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setAvatar(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatarPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const onSubmit = async () => {
    if (avatar) {
      const formData = new FormData();
      formData.append('avatar', avatar);
  
      try {
        const userToken = sessionCookie;
        const response = await axios.post(
          'http://localhost:8000/api/profile/update-avatar',
          formData,
          {
            headers: {
              'Content-Type': 'multipart/form-data',
              Authorization: `Bearer ${userToken}`,
            },
          }
        );
        if (response.status === 200) {
          console.log('Avatar uploaded successfully');
        } else {
          console.error('Failed to upload avatar');
        }
      } catch (error) {
        console.error('Error uploading avatar:', error);
      }
    } else {
      console.error('No avatar selected');
    }
  };

  const onClickUpload = () => {
    // Simulate a click event on the file input element
    const fileUpload = document.getElementById('fileUpload');
    if (fileUpload) {
      fileUpload.click();
    }
  };

  return (
    <div>
      <Card className="max-w-[250px] h-[310px] p-4">
        <div className="max-w-[250px] h-[300px] p-1">
          <Card>
          <div className="w-[170px] h-[170px] p-4 m-auto">
            {avatarPreview ? (
              <Image
                src={avatarPreview}
                alt="Selected Avatar"
                width={120}
                height={120}
              />
            ) : (
              <Image
                src={avatarIcon}
                alt="Default Avatar"
                width={120}
                height={120}
              />
            )}
          </div>
          </Card>
          <div className="flex flex-col gap-2 mt-3">
            <label htmlFor="fileUpload" className="cursor-pointer">
              <Button  className='w-full' variant="outline" onClick={onClickUpload}>
                Pilih Gambar
              </Button>
              <input
                id="fileUpload"
                type="file"
                accept="image/*"
                onChange={handleAvatarChange}
                style={{ display: 'none' }}
              />
            </label>
            <Button variant="outline" onClick={onSubmit}>
              Upload Avatar
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
}
