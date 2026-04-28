import { redirect } from 'next/navigation';

/**
 * Catch /menu (without locale prefix) and redirect to /pt/menu.
 * Prevents 500 when users access the URL without a locale.
 */
export default function MenuRedirect() {
  redirect('/pt/menu');
}
