import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

interface RequestBody {
  userType: 'therapist' | 'doctor'
  email: string
  fullName: string
}

interface ResidenceCreation {
  residence_user_id: string
  created_user_id: string
  creation_type: 'therapist' | 'doctor'
}

serve(async (req) => {
  try {
    // 1. Obtener y validar el token de autorización
    const authHeader = req.headers.get('Authorization')
    if (!authHeader) {
      return new Response(
        JSON.stringify({ error: 'No se proporcionó token de autorización' }),
        { status: 401, headers: { 'Content-Type': 'application/json' } }
      )
    }

    // 2. Crear cliente Supabase con las credenciales de servicio
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '',
      {
        auth: {
          autoRefreshToken: false,
          persistSession: false
        }
      }
    )

    // 3. Verificar el token y obtener el usuario
    const { data: { user }, error: authError } = await supabase.auth.getUser(authHeader)
    if (authError || !user) {
      return new Response(
        JSON.stringify({ error: 'Token inválido o expirado' }),
        { status: 401, headers: { 'Content-Type': 'application/json' } }
      )
    }

    // 4. Verificar que el usuario sea una residencia
    const { data: userData, error: userError } = await supabase
      .from('users')
      .select('role')
      .eq('id', user.id)
      .single()

    if (userError || !userData || userData.role !== 'residence') {
      return new Response(
        JSON.stringify({ error: 'No autorizado. Solo las residencias pueden crear usuarios.' }),
        { status: 403, headers: { 'Content-Type': 'application/json' } }
      )
    }

    // 5. Obtener y validar el cuerpo de la solicitud
    const body: RequestBody = await req.json()
    if (!body.userType || !body.email || !body.fullName) {
      return new Response(
        JSON.stringify({ error: 'Faltan campos requeridos' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      )
    }

    if (body.userType !== 'therapist' && body.userType !== 'doctor') {
      return new Response(
        JSON.stringify({ error: 'Tipo de usuario inválido' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      )
    }

    // 6. Invitar al usuario por email
    const { data: invitedUser, error: inviteError } = await supabase.auth.admin.inviteUserByEmail(
      body.email,
      { data: { full_name: body.fullName } }
    )

    if (inviteError) {
      return new Response(
        JSON.stringify({ error: `Error al invitar usuario: ${inviteError.message}` }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      )
    }

    if (!invitedUser.user) {
      return new Response(
        JSON.stringify({ error: 'No se pudo crear el usuario' }),
        { status: 500, headers: { 'Content-Type': 'application/json' } }
      )
    }

    // 7. Determinar role y sub_role
    const role = body.userType
    const sub_role = `${body.userType}_residential`

    // 8. Insertar en la tabla users
    const { error: usersError } = await supabase
      .from('users')
      .insert({
        id: invitedUser.user.id,
        email: body.email,
        role: role,
        sub_role: sub_role
      })

    if (usersError) {
      return new Response(
        JSON.stringify({ error: `Error al crear usuario: ${usersError.message}` }),
        { status: 500, headers: { 'Content-Type': 'application/json' } }
      )
    }

    // 9. Insertar en user_profiles
    const { error: profilesError } = await supabase
      .from('user_profiles')
      .insert({
        user_id: invitedUser.user.id,
        full_name: body.fullName
      })

    if (profilesError) {
      return new Response(
        JSON.stringify({ error: `Error al crear perfil: ${profilesError.message}` }),
        { status: 500, headers: { 'Content-Type': 'application/json' } }
      )
    }

    // 10. Insertar en residence_creations
    const residenceCreation: ResidenceCreation = {
      residence_user_id: user.id,
      created_user_id: invitedUser.user.id,
      creation_type: body.userType
    }

    const { error: creationsError } = await supabase
      .from('residence_creations')
      .insert(residenceCreation)

    if (creationsError) {
      return new Response(
        JSON.stringify({ error: `Error al registrar creación: ${creationsError.message}` }),
        { status: 500, headers: { 'Content-Type': 'application/json' } }
      )
    }

    // 11. Devolver respuesta exitosa
    return new Response(
      JSON.stringify({
        success: true,
        userId: invitedUser.user.id,
        message: 'Usuario creado exitosamente'
      }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    )

  } catch (error) {
    return new Response(
      JSON.stringify({ error: `Error interno del servidor: ${error.message}` }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    )
  }
}) 