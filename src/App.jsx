
import React from "react"
import { Routes, Route, Navigate, useNavigate } from "react-router-dom"
import Register from "@/pages/Register"
import Login from "@/pages/Login"
import Home from "@/pages/Home"
import HomeFamilyMember from "@/pages/HomeFamilyMember"
import HomeTherapist from "@/pages/HomeTherapist"
import HomeDoctor from "@/pages/HomeDoctor"
import HomeResidence from "@/pages/HomeResidence"
import Psychometrics from "@/pages/Psychometrics"
import Sessions from "@/pages/Sessions"
import Profile from "@/pages/Profile"
import Layout from "@/components/Layout"
import RecordPersonalDataConsumerResidentialTreatment from "@/pages/RecordPersonalDataConsumerResidentialTreatment"
import RecordPersonalDataFamilyMember from "@/pages/RecordPersonalDataFamilyMember"
import RecordPersonalDataTherapistResidencia from "@/pages/RecordPersonalDataTherapistResidencia"
import RecordPersonalDataTherapistCasa from "@/pages/RecordPersonalDataTherapistCasa"
import RecordPersonalDataDoctorResidencia from "@/pages/RecordPersonalDataDoctorResidencia"
import RecordPersonalDataDoctorCasa from "@/pages/RecordPersonalDataDoctorCasa"
import RecordPersonalDataResidence from "@/pages/RecordPersonalDataResidence"
import TherapistFileManagementPage from "@/pages/TherapistFileManagementPage"
import PreStripePaymentPage from "@/pages/PreStripePaymentPage"
import { supabase } from "@/lib/supabase"
import { useToast } from "@/components/ui/use-toast"

function App() {
  const navigate = useNavigate()
  const { toast } = useToast()
  const [session, setSession] = React.useState(null)
  const [loading, setLoading] = React.useState(true)
  const [userRole, setUserRole] = React.useState(null)

  React.useEffect(() => {
    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
      if (session) {
        // Get user role
        supabase
          .from('users')
          .select('role')
          .eq('id', session.user.id)
          .single()
          .then(({ data, error }) => {
            if (!error && data) {
              setUserRole(data.role)
            }
          })
      }
      setLoading(false)
    })

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
      if (session) {
        // Get user role on auth change
        supabase
          .from('users')
          .select('role')
          .eq('id', session.user.id)
          .single()
          .then(({ data, error }) => {
            if (!error && data) {
              setUserRole(data.role)
            }
          })
      } else {
        setUserRole(null)
      }
    })

    return () => subscription.unsubscribe()
  }, [])

  if (loading) {
    return <div>Loading...</div>
  }

  return (
    <Routes>
      {/* Public routes - always accessible */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      
      {/* Protected routes - require authentication */}
      <Route element={session ? <Layout /> : <Navigate to="/login" />}>
        {/* Home routes */}
        <Route path="/" element={
          userRole === 'family' ? <Navigate to="/home-family" /> :
          userRole === 'therapist' ? <Navigate to="/home-therapist" /> :
          userRole === 'doctor' ? <Navigate to="/home-doctor" /> :
          userRole === 'residence' ? <Navigate to="/home-residence" /> :
          <Home />
        } />
        <Route path="/home-family" element={<HomeFamilyMember />} />
        <Route path="/home-therapist" element={<HomeTherapist />} />
        <Route path="/home-doctor" element={<HomeDoctor />} />
        <Route path="/home-residence" element={<HomeResidence />} />

        {/* Record personal data routes */}
        <Route path="/record-consumer-residential" element={<RecordPersonalDataConsumerResidentialTreatment />} />
        <Route path="/record-family" element={<RecordPersonalDataFamilyMember />} />
        <Route path="/record-therapist-residential" element={<RecordPersonalDataTherapistResidencia />} />
        <Route path="/record-therapist-home" element={<RecordPersonalDataTherapistCasa />} />
        <Route path="/record-doctor-residential" element={<RecordPersonalDataDoctorResidencia />} />
        <Route path="/record-doctor-home" element={<RecordPersonalDataDoctorCasa />} />
        <Route path="/record-residence" element={<RecordPersonalDataResidence />} />

        {/* Other routes */}
        <Route path="/therapist-file-management" element={<TherapistFileManagementPage />} />
        <Route path="/payment" element={<PreStripePaymentPage />} />
        <Route path="/psychometrics" element={<Psychometrics />} />
        <Route path="/sessions" element={<Sessions />} />
        <Route path="/profile" element={<Profile />} />
      </Route>

      {/* Redirect any unknown routes to login */}
      <Route path="*" element={<Navigate to="/login" />} />
    </Routes>
  )
}

export default App
