import { useUser } from '@clerk/clerk-react'
import React, { useEffect, useState } from 'react'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from './ui/card'
import { Heart, MapPinCheck, Trash2Icon } from 'lucide-react'
import { Link } from 'react-router-dom';
import { Button } from './ui/button';
import UseFetch from '@/hooks/UseFetch';
import { savedJobs } from '@/api/apijobs';
import { deleteJob } from '@/api/apijobs';
import { BarLoader } from 'react-spinners';


const JobCard = ({ 
   job, 
   isMyJob=false, 
   savedInit=false, 
   onJobSaved=()=>{} 
  }) => {

   const [saved, setSaved] = useState(savedInit)

   const { 
      fn: fnsavedJob,
      data: SavedJob,
      loading: loadingSavedJob, 
     } = UseFetch(savedJobs, {alreadySaved: saved});

   const { user } = useUser()

   const handleSavedJobs = async () => {
      await fnsavedJob({
         user_id: user.id,
         job_id: job.id
      })
      onJobSaved();
   }

   useEffect(() => {
     if(SavedJob !== undefined) {
      setSaved(SavedJob?.length > 0)
   }
   }, [SavedJob])


   const { loading: loadingDeleteJob, fn: fnDeleteJob } = UseFetch(deleteJob, {
      job_id: job.id,
    });

    const handleDeleteJob = async () => {
      await fnDeleteJob();
      onJobAction();
    };

  return (
    <Card className="flex flex-col">
       {loadingDeleteJob && <BarLoader className="mt-4" width={"100%"} color="#36d7b7" />}
       <CardHeader>
          <CardTitle className="flex justify-between font-bold">
              {job.title}

              {isMyJob && (
                <Trash2Icon 
                  fill='red'
                  size={18}
                  className='text-red-300 cursor-pointer'
                  onClick={handleDeleteJob}
                />
              )}
          </CardTitle>
       </CardHeader>

       <CardContent className="flex flex-col gap-4 flex-1">
          <div className='flex justify-between'>
             {job.company && 
               <img src={job.company.logo_url} className='h-6'/>
             }

             <div className='flex gap-2 items-center'>
               <MapPinCheck size={15} /> {job.location}
             </div>
          </div>
          
          <hr />
          {job.description.substring(0, job.description.indexOf("."))}
       </CardContent>

       <CardFooter className="flex gap-2">
          <Link to={`/jobs/${job.id}`} className="flex-1">
             <Button className="w-full" variant="secondary">
                More Details
             </Button>
          </Link>

          {!isMyJob && (
            <Button
              variant="outline"
              className="w-15"
              onClick={handleSavedJobs}
              disabled={loadingSavedJob}
            >
               {saved ? (
                  <Heart size={20} stroke='red' fill='red'/>
                 ) : (
                  <Heart size={20}/> 
                 )
               }
            </Button>
          )}
       </CardFooter>
    </Card>
  )
}

export default JobCard