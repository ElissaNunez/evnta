-- ============================================================
-- EVNTA - Esquema completo para Supabase
-- Ejecutar esto en el SQL Editor de Supabase
-- ============================================================

-- 1. TABLA DE PERFILES DE USUARIO (se vincula con auth.users)
-- ============================================================
CREATE TABLE IF NOT EXISTS public.profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    email TEXT NOT NULL,
    name TEXT NOT NULL,
    phone TEXT,
    city TEXT,
    state TEXT,
    avatar_url TEXT,
    role TEXT NOT NULL CHECK (role IN ('client', 'provider', 'admin')),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- RLS para profiles
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Cualquiera puede ver perfiles"
    ON public.profiles FOR SELECT
    USING (true);

CREATE POLICY "Usuarios pueden crear su propio perfil"
    ON public.profiles FOR INSERT
    WITH CHECK (auth.uid() = id);

CREATE POLICY "Usuarios pueden actualizar su propio perfil"
    ON public.profiles FOR UPDATE
    USING (auth.uid() = id);

-- 2. TABLA DE PROVEEDORES
-- ============================================================
CREATE TABLE IF NOT EXISTS public.providers (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    business_name TEXT NOT NULL,
    description TEXT,
    category TEXT NOT NULL,
    subcategories TEXT[] DEFAULT '{}',
    services JSONB DEFAULT '[]',
    city TEXT,
    state TEXT,
    address TEXT,
    phone TEXT,
    email TEXT,
    website TEXT,
    instagram TEXT,
    portfolio_urls TEXT[] DEFAULT '{}',
    logo_url TEXT,
    trial_active BOOLEAN DEFAULT true,
    trial_ends_at TIMESTAMPTZ DEFAULT (NOW() + INTERVAL '30 days'),
    plan TEXT DEFAULT 'free' CHECK (plan IN ('free', 'professional', 'enterprise')),
    commission_rate DECIMAL(4,2) DEFAULT 10.00,
    rating DECIMAL(3,2) DEFAULT 0.00,
    reviews_count INTEGER DEFAULT 0,
    is_verified BOOLEAN DEFAULT false,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.providers ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Cualquiera puede ver proveedores activos"
    ON public.providers FOR SELECT
    USING (is_active = true);

CREATE POLICY "Proveedores pueden crear su perfil"
    ON public.providers FOR INSERT
    WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Proveedores pueden actualizar su propio perfil"
    ON public.providers FOR UPDATE
    USING (auth.uid() = user_id);

-- 3. TABLA DE EVENTOS
-- ============================================================
CREATE TABLE IF NOT EXISTS public.events (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    event_name TEXT NOT NULL,
    event_type TEXT NOT NULL,
    event_date DATE,
    guest_count INTEGER,
    budget DECIMAL(12,2),
    budget_flexibility TEXT CHECK (budget_flexibility IN ('strict', 'moderate', 'flexible')),
    city TEXT,
    venue_type TEXT,
    style TEXT,
    special_requests TEXT,
    status TEXT DEFAULT 'draft' CHECK (status IN ('draft', 'published', 'in_progress', 'completed', 'cancelled')),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.events ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Usuarios pueden ver sus propios eventos"
    ON public.events FOR SELECT
    USING (auth.uid() = user_id);

CREATE POLICY "Usuarios pueden crear sus eventos"
    ON public.events FOR INSERT
    WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Usuarios pueden actualizar sus eventos"
    ON public.events FOR UPDATE
    USING (auth.uid() = user_id);

-- 4. TABLA DE CONTRATOS
-- ============================================================
CREATE TABLE IF NOT EXISTS public.contracts (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    event_id UUID REFERENCES public.events(id) ON DELETE SET NULL,
    client_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    provider_id UUID REFERENCES public.providers(id) ON DELETE CASCADE,
    event_name TEXT NOT NULL,
    event_date DATE,
    event_location TEXT,
    service_description TEXT NOT NULL,
    services JSONB DEFAULT '[]',
    total_amount DECIMAL(12,2) NOT NULL,
    deposit_amount DECIMAL(12,2) NOT NULL,
    deposit_percent INTEGER DEFAULT 30,
    balance_amount DECIMAL(12,2) NOT NULL,
    payment_terms TEXT,
    cancellation_policy TEXT,
    status TEXT DEFAULT 'pending_signature' 
        CHECK (status IN ('draft', 'pending_signature', 'signed_by_client', 'signed_by_provider', 'fully_signed', 'cancelled')),
    client_signature JSONB,
    provider_signature JSONB,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.contracts ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Participantes pueden ver sus contratos"
    ON public.contracts FOR SELECT
    USING (auth.uid() = client_id OR auth.uid() IN (
        SELECT user_id FROM public.providers WHERE id = provider_id
    ));

CREATE POLICY "Clientes pueden crear contratos"
    ON public.contracts FOR INSERT
    WITH CHECK (auth.uid() = client_id);

CREATE POLICY "Participantes pueden actualizar sus contratos"
    ON public.contracts FOR UPDATE
    USING (auth.uid() = client_id OR auth.uid() IN (
        SELECT user_id FROM public.providers WHERE id = provider_id
    ));

-- 5. TABLA DE DISPUTAS
-- ============================================================
CREATE TABLE IF NOT EXISTS public.disputes (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    contract_id UUID REFERENCES public.contracts(id) ON DELETE SET NULL,
    client_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    provider_id UUID REFERENCES public.providers(id) ON DELETE CASCADE,
    event_name TEXT NOT NULL,
    subject TEXT NOT NULL,
    description TEXT NOT NULL,
    category TEXT NOT NULL,
    status TEXT DEFAULT 'open' CHECK (status IN ('open', 'under_review', 'mediation', 'resolved', 'closed')),
    resolution TEXT CHECK (resolution IN ('refund_full', 'refund_partial', 'no_refund', 'reschedule', 'pending')),
    refund_amount DECIMAL(12,2) DEFAULT 0,
    resolution_notes TEXT,
    evidence_urls TEXT[] DEFAULT '{}',
    resolved_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.disputes ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Participantes pueden ver sus disputas"
    ON public.disputes FOR SELECT
    USING (auth.uid() = client_id OR auth.uid() IN (
        SELECT user_id FROM public.providers WHERE id = provider_id
    ));

CREATE POLICY "Clientes pueden crear disputas"
    ON public.disputes FOR INSERT
    WITH CHECK (auth.uid() = client_id);

-- 6. TABLA DE MENSAJES DE DISPUTAS
-- ============================================================
CREATE TABLE IF NOT EXISTS public.dispute_messages (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    dispute_id UUID REFERENCES public.disputes(id) ON DELETE CASCADE,
    author_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    author_name TEXT NOT NULL,
    author_role TEXT NOT NULL CHECK (author_role IN ('client', 'provider', 'mediator')),
    content TEXT NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.dispute_messages ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Participantes pueden ver mensajes de sus disputas"
    ON public.dispute_messages FOR SELECT
    USING (EXISTS (
        SELECT 1 FROM public.disputes d 
        WHERE d.id = dispute_id 
        AND (d.client_id = auth.uid() OR auth.uid() IN (
            SELECT user_id FROM public.providers WHERE id = d.provider_id
        ))
    ));

CREATE POLICY "Participantes pueden enviar mensajes"
    ON public.dispute_messages FOR INSERT
    WITH CHECK (EXISTS (
        SELECT 1 FROM public.disputes d 
        WHERE d.id = dispute_id 
        AND (d.client_id = auth.uid() OR auth.uid() IN (
            SELECT user_id FROM public.providers WHERE id = d.provider_id
        ))
    ));

-- 7. TABLA DE RESEÑAS
-- ============================================================
CREATE TABLE IF NOT EXISTS public.reviews (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    provider_id UUID REFERENCES public.providers(id) ON DELETE CASCADE,
    client_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    event_id UUID REFERENCES public.events(id) ON DELETE SET NULL,
    contract_id UUID REFERENCES public.contracts(id) ON DELETE SET NULL,
    rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
    comment TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.reviews ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Cualquiera puede ver reseñas"
    ON public.reviews FOR SELECT
    USING (true);

CREATE POLICY "Clientes pueden crear reseñas"
    ON public.reviews FOR INSERT
    WITH CHECK (auth.uid() = client_id);

-- 8. TABLA DE FAVORITOS
-- ============================================================
CREATE TABLE IF NOT EXISTS public.favorites (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    provider_id UUID REFERENCES public.providers(id) ON DELETE CASCADE,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(user_id, provider_id)
);

ALTER TABLE public.favorites ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Usuarios pueden ver sus favoritos"
    ON public.favorites FOR SELECT
    USING (auth.uid() = user_id);

CREATE POLICY "Usuarios pueden agregar favoritos"
    ON public.favorites FOR INSERT
    WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Usuarios pueden eliminar favoritos"
    ON public.favorites FOR DELETE
    USING (auth.uid() = user_id);

-- ============================================================
-- FUNCIONES Y TRIGGERS
-- ============================================================

-- Actualizar updated_at automáticamente
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Aplicar trigger a todas las tablas
CREATE TRIGGER update_profiles_updated_at BEFORE UPDATE ON public.profiles
    FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER update_providers_updated_at BEFORE UPDATE ON public.providers
    FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER update_events_updated_at BEFORE UPDATE ON public.events
    FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER update_contracts_updated_at BEFORE UPDATE ON public.contracts
    FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER update_disputes_updated_at BEFORE UPDATE ON public.disputes
    FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- Función para crear perfil automáticamente al registrarse
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO public.profiles (id, email, name, role, created_at, updated_at)
    VALUES (
        NEW.id,
        NEW.email,
        COALESCE(NEW.raw_user_meta_data->>'name', NEW.email),
        COALESCE(NEW.raw_user_meta_data->>'role', 'client'),
        NOW(),
        NOW()
    );
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger para crear perfil automáticamente
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- ============================================================
-- DATOS DE PRUEBA (Proveedores de ejemplo)
-- ============================================================

INSERT INTO public.providers (
    business_name, description, category, subcategories, services,
    city, state, phone, email, rating, reviews_count, is_verified, is_active,
    plan, commission_rate, trial_active
) VALUES 
('DJ Carlos Events', 'DJ profesional con más de 10 años de experiencia en bodas, XV años y eventos corporativos. Equipo de sonido e iluminación incluido.', 'produccion', ARRAY['dj', 'iluminacion', 'audio-profesional'], 
 '[{"name":"DJ 4 horas","price":8000},{"name":"DJ + Iluminación","price":12000},{"name":"Paquete Premium","price":18000}]',
 'Ciudad de México', 'CDMX', '5512345678', 'djcarlos@evnta.mx', 4.9, 127, true, true, 'professional', 7.00, false),

('Decoración Floral LP', 'Especialistas en decoración con flores naturales y diseño de ambientes para bodas y eventos sociales.', 'decoracion-experiencia', ARRAY['floristas', 'decoracion-tematica', 'centros-mesa'],
 '[{"name":"Decoración básica","price":15000},{"name":"Decoración Premium","price":35000},{"name":"Decoración Luxe","price":60000}]',
 'Guadalajara', 'Jalisco', '3334567890', 'floreslp@evnta.mx', 4.8, 89, true, true, 'professional', 7.00, false),

('Banquete Gourmet Martínez', 'Catering de alta cocina para eventos. Menús personalizados, meseros profesionales y servicio completo.', 'alimentos-bebidas', ARRAY['catering-gourmet', 'bartenders', 'mesa-postres'],
 '[{"name":"Menú básico 100 pax","price":25000},{"name":"Menú Premium 100 pax","price":45000},{"name":"Barra libre","price":18000}]',
 'Monterrey', 'Nuevo León', '8187654321', 'banquete@evnta.mx', 4.7, 203, true, true, 'enterprise', 5.00, false),

('Foto y Video Luna', 'Fotografía y videografía profesional para bodas. Drones, cabina 360 y álbumes de lujo.', 'foto-video', ARRAY['videografia', 'video-drone', 'sesiones-pre-evento'],
 '[{"name":"Fotografía básica","price":12000},{"name":"Foto + Video","price":22000},{"name":"Paquete completo","price":35000}]',
 'Ciudad de México', 'CDMX', '5598765432', 'fotoluna@evnta.mx', 4.9, 156, true, true, 'professional', 7.00, false),

('Brincolines Divertidos', 'Renta de brincolines, inflables y mini feria para eventos infantiles. Seguros y limpios.', 'infantiles', ARRAY['inflables', 'mini-feria', 'shows-infantiles'],
 '[{"name":"Brincolín básico","price":2500},{"name":"Paquete infantil","price":8000},{"name":"Mini feria completa","price":15000}]',
 'Puebla', 'Puebla', '2223456789', 'brincolines@evnta.mx', 4.6, 78, true, true, 'free', 10.00, false),

('Sonido Total MX', 'Equipo de audio profesional, pantallas LED, iluminación y producción para eventos de cualquier tamaño.', 'produccion', ARRAY['audio-profesional', 'pantallas-led', 'iluminacion', 'escenarios'],
 '[{"name":"Audio básico","price":5000},{"name":"Audio + Pantalla","price":12000},{"name":"Producción completa","price":25000}]',
 'Ciudad de México', 'CDMX', '5511122233', 'sonido@evnta.mx', 4.8, 95, true, true, 'professional', 7.00, false),

('Pastelería Dulce Arte', 'Pasteles personalizados, mesas de postres y candy bars. Diseños únicos para cada evento.', 'alimentos-bebidas', ARRAY['mesa-postres', 'candy-bar', 'coffee-bar'],
 '[{"name":"Pastel personalizado","price":3500},{"name":"Mesa de postres","price":8000},{"name":"Candy bar","price":6000}]',
 'Querétaro', 'Querétaro', '4423344556', 'dulcearte@evnta.mx', 4.9, 134, true, true, 'professional', 7.00, false),

('Mariachi Sol de México', 'Mariachi tradicional con más de 15 músicos. Repertorio amplio para cualquier tipo de evento.', 'ceremonias', ARRAY['mariachi', 'musica-vivo'],
 '[{"name":"Mariachi 8 elementos","price":8000},{"name":"Mariachi 12 elementos","price":12000},{"name":"Mariachi Premium 15+","price":18000}]',
 'Ciudad de México', 'CDMX', '5544332211', 'mariachi@evnta.mx', 4.7, 245, true, true, 'free', 10.00, false),

('Coctelería Premium Bar', 'Bartenders certificados, mixología creativa y barras móviles para eventos de lujo.', 'alimentos-bebidas', ARRAY['bartenders', 'mixologia', 'barra-bebidas'],
 '[{"name":"Bartender 4h","price":4000},{"name":"Barra móvil","price":12000},{"name":"Mixología premium","price":18000}]',
 'Cancún', 'Quintana Roo', '9981122334', 'cocteleria@evnta.mx', 4.8, 67, true, true, 'professional', 7.00, false),

('Wedding Planner Sofía R.', 'Planeación integral de bodas. Desde la ceremonia hasta la luna de miel.', 'decoracion-experiencia', ARRAY['wedding-planners', 'coordinadores', 'diseno-experiencias'],
 '[{"name":"Coordinación día del evento","price":15000},{"name":"Planeación parcial","price":35000},{"name":"Planeación integral","price":65000}]',
 'San Miguel de Allende', 'Guanajuato', '4152233445', 'wedding@evnta.mx', 5.0, 42, true, true, 'enterprise', 5.00, false),

('Robots LED México', 'Robots LED de 3 metros, pantallas LED gigantes y mapping para eventos corporativos y conciertos.', 'produccion', ARRAY['robots-led', 'pantallas-led', 'mapping', 'efectos-especiales'],
 '[{"name":"Robot LED","price":25000},{"name":"Pantalla LED","price":15000},{"name":"Mapping","price":20000}]',
 'Ciudad de México', 'CDMX', '5566778899', 'robots@evnta.mx', 4.9, 34, true, true, 'enterprise', 5.00, false)

ON CONFLICT DO NOTHING;

-- ============================================================
-- ÍNDICES PARA RENDIMIENTO
-- ============================================================

CREATE INDEX IF NOT EXISTS idx_providers_category ON public.providers(category);
CREATE INDEX IF NOT EXISTS idx_providers_city ON public.providers(city);
CREATE INDEX IF NOT EXISTS idx_providers_rating ON public.providers(rating DESC);
CREATE INDEX IF NOT EXISTS idx_providers_active ON public.providers(is_active);
CREATE INDEX IF NOT EXISTS idx_events_user_id ON public.events(user_id);
CREATE INDEX IF NOT EXISTS idx_events_status ON public.events(status);
CREATE INDEX IF NOT EXISTS idx_contracts_client_id ON public.contracts(client_id);
CREATE INDEX IF NOT EXISTS idx_contracts_provider_id ON public.contracts(provider_id);
CREATE INDEX IF NOT EXISTS idx_contracts_status ON public.contracts(status);
CREATE INDEX IF NOT EXISTS idx_disputes_client_id ON public.disputes(client_id);
CREATE INDEX IF NOT EXISTS idx_disputes_status ON public.disputes(status);
CREATE INDEX IF NOT EXISTS idx_reviews_provider_id ON public.reviews(provider_id);
CREATE INDEX IF NOT EXISTS idx_favorites_user_id ON public.favorites(user_id);
