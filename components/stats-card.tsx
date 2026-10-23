import { ReactNode } from 'react'
import { Card, CardContent } from '@/components/ui/card'

interface StatsCardProps {
  title: string
  value: string | number
  icon?: ReactNode
  trend?: {
    label: string
    value: number
    isPositive: boolean
  }
  className?: string
}

export function StatsCard({
  title,
  value,
  icon,
  trend,
  className = 'bg-blue-100',
}: StatsCardProps) {
  return (
    <Card className="border-0 shadow-sm hover:shadow-md transition-shadow">
      <CardContent className="pt-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-600 font-medium">{title}</p>
            <p className="text-3xl font-bold text-gray-900 mt-2">{value}</p>
            {trend && (
              <p
                className={`text-xs font-semibold mt-2 ${
                  trend.isPositive ? 'text-green-600' : 'text-red-600'
                }`}
              >
                {trend.isPositive ? '↑' : '↓'} {trend.value}% {trend.label}
              </p>
            )}
          </div>
          {icon && (
            <div className={`p-3 rounded-lg ${className}`}>
              {icon}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
