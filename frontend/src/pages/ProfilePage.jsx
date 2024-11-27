import { useMutation, useQueryClient, useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom'
import { axiosInstance } from "../lib/axios";
import ProfileHeader from './ProfileHeader';
import AboutSection from '../component/AboutSection';
import ExperienceSection from "../component/ExperienceSection";
import EducationSection from "../component/EducationSection";
import SkillsSection from "../component/SkillsSection";
import toast from 'react-hot-toast';

const ProfilePage = () => {

    const { username } = useParams();
    const queryClient = useQueryClient();

    const { data: authUser, isLoading } = useQuery({
        queryKey: ["authUser"],
    });

    const { data: userProfile, isLoading: isLoadingUserProfile } = useQuery({
        queryKey: ["userProfile", username],
        queryFn: () => axiosInstance.get(`/users/${username}`),
    });

    const { mutate: updateProfile } = useMutation({
        mutationFn: async (updateData) => {
            toast.success("Profile updated successfully");
            await axiosInstance.put(`/users/profile`, updateData);
        },
        onSuccess: () => {
            queryClient.invalidateQueries(["userProfile", username]);
        },
    })

    if (isLoading || isLoadingUserProfile) return null;

    const isOwnProfile = authUser.username === userProfile.data.username;
    const userData = isOwnProfile ? authUser : userProfile.data;

    const handleSave = (updateData) => {
        updateProfile(updateData);
    };

    return (
        <div className='max-w-4xl mx-auto p-4'>
            <ProfileHeader userData={userData} isOwnProfile={isOwnProfile} onSave={handleSave} />
            <AboutSection userData={userData} isOwnProfile={isOwnProfile} onSave={handleSave} />
            <ExperienceSection userData={userData} isOwnProfile={isOwnProfile} onSave={handleSave} />
            <EducationSection userData={userData} isOwnProfile={isOwnProfile} onSave={handleSave} />
            <SkillsSection userData={userData} isOwnProfile={isOwnProfile} onSave={handleSave} />
        </div>
    )
}

export default ProfilePage