import type { HTMLAttributes } from 'react'

/**
 * Иконки проекта — шрифтовой набор Flaticon UIcons (вариант Bold Rounded + Brands).
 * Шрифт подключается через <link> в index.html (CDN cdn-uicons.flaticon.com).
 *
 * Каждый компонент рендерит <i> с классом нужного глифа. Размер и цвет
 * управляются через CSS (font-size / color), а не через width/height.
 */

type IconProps = HTMLAttributes<HTMLElement>

// Фабрика: создаёт компонент-иконку по имени класса UIcons.
const uicon =
  (glyph: string) =>
  ({ className = '', ...props }: IconProps) =>
    <i className={`fi ${glyph} ${className}`.trim()} {...props} />

export const CodeIcon = uicon('fi-br-code-simple')
export const UsersIcon = uicon('fi-br-users')
export const ShieldIcon = uicon('fi-br-shield-check')
export const MailIcon = uicon('fi-br-envelope')
export const LockIcon = uicon('fi-br-lock')
export const EyeIcon = uicon('fi-br-eye')
export const EyeOffIcon = uicon('fi-br-eye-crossed')
export const ArrowRightIcon = uicon('fi-br-arrow-right')
export const ArrowLeftIcon = uicon('fi-br-arrow-left')
export const GoogleIcon = uicon('fi-brands-google')
export const GitHubIcon = uicon('fi-brands-github')
