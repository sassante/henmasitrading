'use client'

import { useState } from 'react'
import { AdminLayout } from '@/components/admin-layout'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Textarea } from '@/components/ui/textarea'
import { Save, Upload } from 'lucide-react'
import { toast } from 'sonner'

export default function SettingsPage() {
  const [businessInfo, setBusinessInfo] = useState({
    companyName: 'Henmasi Trading Enterprise',
    email: 'info@henmasi.com',
    phone: '+233 24 567 8900',
    address: 'Accra Central, Accra',
    city: 'Accra',
    country: 'Ghana',
    description:
      'Quality industrial electronics and electrical supplies for commercial and industrial projects.',
  })

  const [contactInfo, setContactInfo] = useState({
    salesLine1: '+233 24 123 4567',
    salesLine2: '+233 20 987 6543',
    whatsappNumber: '+233 24 123 4567',
  })

  const [theme, setTheme] = useState({
    primaryColor: '#FBBF24',
    secondaryColor: '#1F2937',
  })

  const handleBusinessInfoChange = (key: string, value: string) => {
    setBusinessInfo({ ...businessInfo, [key]: value })
  }

  const handleContactInfoChange = (key: string, value: string) => {
    setContactInfo({ ...contactInfo, [key]: value })
  }

  const handleThemeChange = (key: string, value: string) => {
    setTheme({ ...theme, [key]: value })
  }

  const handleSave = (section: string) => {
    toast.success(`${section} saved successfully!`)
  }

  return (
    <AdminLayout>
      <div className="space-y-8">
        {/* Page Header */}
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Settings</h1>
          <p className="text-gray-600 mt-1">Manage your business information and preferences</p>
        </div>

        {/* Business Information */}
        <Card className="border-0 shadow-sm">
          <CardHeader>
            <CardTitle>Business Information</CardTitle>
            <CardDescription>Update your company details</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-2 block">
                    Company Name
                  </label>
                  <Input
                    value={businessInfo.companyName}
                    onChange={(e) => handleBusinessInfoChange('companyName', e.target.value)}
                    className="border-gray-200"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-2 block">
                    Email Address
                  </label>
                  <Input
                    type="email"
                    value={businessInfo.email}
                    onChange={(e) => handleBusinessInfoChange('email', e.target.value)}
                    className="border-gray-200"
                  />
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-2 block">
                    Phone Number
                  </label>
                  <Input
                    value={businessInfo.phone}
                    onChange={(e) => handleBusinessInfoChange('phone', e.target.value)}
                    className="border-gray-200"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-2 block">
                    Country
                  </label>
                  <Input
                    value={businessInfo.country}
                    onChange={(e) => handleBusinessInfoChange('country', e.target.value)}
                    className="border-gray-200"
                  />
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-2 block">
                    City
                  </label>
                  <Input
                    value={businessInfo.city}
                    onChange={(e) => handleBusinessInfoChange('city', e.target.value)}
                    className="border-gray-200"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-2 block">
                    Address
                  </label>
                  <Input
                    value={businessInfo.address}
                    onChange={(e) => handleBusinessInfoChange('address', e.target.value)}
                    className="border-gray-200"
                  />
                </div>
              </div>

              <div>
                <label className="text-sm font-medium text-gray-700 mb-2 block">
                  Company Description
                </label>
                <Textarea
                  value={businessInfo.description}
                  onChange={(e) => handleBusinessInfoChange('description', e.target.value)}
                  className="border-gray-200"
                  rows={4}
                />
              </div>

              <Button
                onClick={() => handleSave('Business Information')}
                className="bg-yellow-500 text-gray-900 hover:bg-yellow-600"
              >
                <Save className="h-4 w-4 mr-2" />
                Save Changes
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Contact Information */}
        <Card className="border-0 shadow-sm">
          <CardHeader>
            <CardTitle>Contact Information</CardTitle>
            <CardDescription>WhatsApp and customer service contacts</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium text-gray-700 mb-2 block">
                  Sales Line 1 (WhatsApp)
                </label>
                <Input
                  value={contactInfo.salesLine1}
                  onChange={(e) => handleContactInfoChange('salesLine1', e.target.value)}
                  placeholder="+233 XX XXX XXXX"
                  className="border-gray-200"
                />
              </div>

              <div>
                <label className="text-sm font-medium text-gray-700 mb-2 block">
                  Sales Line 2 (WhatsApp)
                </label>
                <Input
                  value={contactInfo.salesLine2}
                  onChange={(e) => handleContactInfoChange('salesLine2', e.target.value)}
                  placeholder="+233 XX XXX XXXX"
                  className="border-gray-200"
                />
              </div>

              <div>
                <label className="text-sm font-medium text-gray-700 mb-2 block">
                  Primary WhatsApp Number
                </label>
                <Input
                  value={contactInfo.whatsappNumber}
                  onChange={(e) => handleContactInfoChange('whatsappNumber', e.target.value)}
                  placeholder="+233 XX XXX XXXX"
                  className="border-gray-200"
                />
              </div>

              <Button
                onClick={() => handleSave('Contact Information')}
                className="bg-yellow-500 text-gray-900 hover:bg-yellow-600"
              >
                <Save className="h-4 w-4 mr-2" />
                Save Changes
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Logo Upload */}
        <Card className="border-0 shadow-sm">
          <CardHeader>
            <CardTitle>Logo Upload</CardTitle>
            <CardDescription>Upload your company logo</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-yellow-500 transition-colors cursor-pointer">
                <Upload className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                <p className="text-sm text-gray-600 mb-2">
                  Drag and drop your logo here or click to browse
                </p>
                <p className="text-xs text-gray-500">PNG, JPG up to 5MB</p>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-sm text-gray-700">
                  <strong>Current logo:</strong> Henmasi_Logo.png
                </p>
              </div>

              <Button
                onClick={() => toast.info('Logo upload feature coming soon')}
                variant="outline"
                className="border-yellow-500 text-yellow-600 hover:bg-yellow-50"
              >
                Update Logo
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Theme Settings */}
        <Card className="border-0 shadow-sm">
          <CardHeader>
            <CardTitle>Theme Settings</CardTitle>
            <CardDescription>Customize your dashboard appearance</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-2 block">
                    Primary Color
                  </label>
                  <div className="flex items-center gap-3">
                    <input
                      type="color"
                      value={theme.primaryColor}
                      onChange={(e) => handleThemeChange('primaryColor', e.target.value)}
                      className="h-10 w-16 rounded border-gray-200 cursor-pointer"
                    />
                    <Input
                      value={theme.primaryColor}
                      onChange={(e) => handleThemeChange('primaryColor', e.target.value)}
                      className="border-gray-200 flex-1"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-700 mb-2 block">
                    Secondary Color
                  </label>
                  <div className="flex items-center gap-3">
                    <input
                      type="color"
                      value={theme.secondaryColor}
                      onChange={(e) => handleThemeChange('secondaryColor', e.target.value)}
                      className="h-10 w-16 rounded border-gray-200 cursor-pointer"
                    />
                    <Input
                      value={theme.secondaryColor}
                      onChange={(e) => handleThemeChange('secondaryColor', e.target.value)}
                      className="border-gray-200 flex-1"
                    />
                  </div>
                </div>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg space-y-2">
                <p className="text-sm font-medium text-gray-900">Theme Preview</p>
                <div className="flex gap-3">
                  <div
                    className="w-24 h-24 rounded-lg border-2"
                    style={{ backgroundColor: theme.primaryColor, borderColor: theme.primaryColor }}
                  />
                  <div
                    className="w-24 h-24 rounded-lg border-2"
                    style={{ backgroundColor: theme.secondaryColor, borderColor: theme.secondaryColor }}
                  />
                </div>
              </div>

              <Button
                onClick={() => handleSave('Theme Settings')}
                className="bg-yellow-500 text-gray-900 hover:bg-yellow-600"
              >
                <Save className="h-4 w-4 mr-2" />
                Save Changes
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  )
}
