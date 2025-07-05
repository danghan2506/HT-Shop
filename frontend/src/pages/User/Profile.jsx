import React from 'react'
import { useState, useEffect } from 'react'
import { useProfileMutation } from '../../redux/api/user-api-slice'
import { setCredentials } from '../../redux/features/Auth/auth-slice'
import { Link } from 'react-router-dom'
import { useSelector , useDispatch} from 'react-redux'
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardAction,
  CardFooter,
} from "@/components/ui/card";
import { toast } from 'react-toastify'
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
const Profile = () => {
  const [username, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const {userInfo} = useSelector(state => state.auth)
  const [updateProfile] = useProfileMutation()
  const dispatch = useDispatch();
   useEffect(() => {
    setUserName(userInfo.username);
    setEmail(userInfo.email);
  }, [userInfo.email, userInfo.username]);
  const submitHandler = async (e) => {
    e.preventDefault()
    try {
        const res = await updateProfile({
          _id: userInfo._id,
          username,
          email,
          password,
        }).unwrap();
        dispatch(setCredentials({ ...res }));
        toast.success("Profile updated successfully");
    } catch (error) {
        toast.error(error?.data?.message || error.error);
    }
  }
  return (
     <div className="flex flex-row relative w-screen mx-5 my-5">
          <Card className="w-full max-w-md flex justify-center">
            <CardHeader>
              <CardTitle>Profile</CardTitle>
              <CardDescription>
                Update your personal information and password here.
              </CardDescription>
            </CardHeader>
            <form onSubmit={submitHandler}>
              <CardContent>
                          <div className="flex flex-col gap-6">
                            <div className="grid gap-2">
                              <Label htmlFor="name">Username</Label>
                              <Input
                                id="name"
                                type="text"
                                onChange={(e) => setUserName(e.target.value)}
                                placeholder={userInfo.username}
                              />
                            </div>
                            <div className="grid gap-2">
                              <Label htmlFor="email">Email</Label>
                              <Input
                                id="email"
                                type="email"
                                readOnly
                                placeholder={email}
                                disabled
                              />
                            </div>
                            <div className="grid gap-2">
                              <div className="flex items-center">
                                <Label htmlFor="password">Password</Label>
                              </div>
                              <Input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                              />
                            </div>
                          </div>
                          <CardFooter className="flex-col gap-2 mt-5">
                            <Button type="submit" className="w-full cursor-pointer">
                              Update
                            </Button>
                          </CardFooter>
                        </CardContent>
            </form>
          </Card>
        </div>
  )
}

export default Profile