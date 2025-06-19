import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { Bell, MessageSquare, Settings } from 'lucide-react-native';
import { Theme } from '@/src/constants/theme';

interface ArtistHeaderProps {
  title: string;
  showBackButton?: boolean;
}

export function ArtistHeader({ title, showBackButton = false }: ArtistHeaderProps) {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <View style={styles.leftSection}>
        {showBackButton && (
          <TouchableOpacity 
            onPress={() => router.back()}
            style={styles.backButton}
          >
            <Text style={styles.backButtonText}>←</Text>
          </TouchableOpacity>
        )}
        <Text style={styles.title}>{title}</Text>
      </View>
      
      <View style={styles.rightSection}>
        <TouchableOpacity 
          onPress={() => router.push('/artist/messages')}
          style={styles.iconButton}
        >
          <MessageSquare color={Theme.colors.text} size={24} />
        </TouchableOpacity>
        
        <TouchableOpacity 
          onPress={() => router.push('/artist/notifications')}
          style={styles.iconButton}
        >
          <Bell color={Theme.colors.text} size={24} />
        </TouchableOpacity>
        
        <TouchableOpacity 
          onPress={() => router.push('/artist/settings')}
          style={styles.iconButton}
        >
          <Settings color={Theme.colors.text} size={24} />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: Theme.spacing.lg,
    paddingVertical: Theme.spacing.md,
    backgroundColor: Theme.colors.background,
    borderBottomWidth: 1,
    borderBottomColor: Theme.colors.border,
  },
  leftSection: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  backButton: {
    marginRight: Theme.spacing.sm,
  },
  backButtonText: {
    fontSize: Theme.typography.fontSize.xl,
    color: Theme.colors.text,
  },
  title: {
    fontSize: Theme.typography.fontSize.lg,
    fontWeight: '600',
    color: Theme.colors.text,
  },
  rightSection: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconButton: {
    padding: Theme.spacing.sm,
    marginLeft: Theme.spacing.sm,
  },
}); 