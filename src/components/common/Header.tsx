import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Bell, LogIn, MessageSquare, ShoppingBag } from 'lucide-react-native';
import { useNavigation } from '@react-navigation/native';
import { useRouter } from 'expo-router';
import { Theme } from '@/src/constants/theme';

interface HeaderProps {
  title: string;
}

export function Header({ title }: HeaderProps) {
  const navigation = useNavigation();
  const router = useRouter();

  const handleLogout = () => {
    router.push('/auth');
  };

  const handleNotificationsPress = () => {
    router.push('/(client)/(hidden)/notifications');
  };

  const handleMessagesPress = () => {
    router.push('/(client)/(hidden)/messages');
  };

  const handleOrdersPress = () => {
    router.push('/(client)/(hidden)/orders');
  };
  
  return (
    <SafeAreaView edges={['top']} style={styles.headerContainer}>
      <View style={styles.header}>
        <View style={styles.headerTitleContainer}>
          <Text style={styles.headerTitle}>{title}</Text>
        </View>
        <View style={styles.headerRightIcons}>
          <TouchableOpacity 
            onPress={handleMessagesPress} 
            style={styles.headerIconButton}
            activeOpacity={0.7}
          >
            <View style={styles.iconWrapper}>
              <MessageSquare color={Theme.colors.textSecondary} size={22} />
              <View style={[styles.notificationBadge, styles.messageBadge]} />
            </View>
          </TouchableOpacity>
          <TouchableOpacity 
            onPress={handleOrdersPress} 
            style={styles.headerIconButton}
            activeOpacity={0.7}
          >
            <View style={styles.iconWrapper}>
              <ShoppingBag color={Theme.colors.textSecondary} size={22} />
              <View style={[styles.notificationBadge, styles.orderBadge]} />
            </View>
          </TouchableOpacity>
          <TouchableOpacity 
            onPress={handleNotificationsPress} 
            style={styles.headerIconButton}
            activeOpacity={0.7}
          >
            <View style={styles.iconWrapper}>
              <Bell color={Theme.colors.textSecondary} size={22} />
              <View style={[styles.notificationBadge, styles.notificationBadge]} />
            </View>
          </TouchableOpacity>
          <TouchableOpacity 
            onPress={handleLogout} 
            style={styles.headerIconButton}
            activeOpacity={0.7}
          >
            <View style={styles.iconWrapper}>
              <LogIn color={Theme.colors.textSecondary} size={22} />
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    backgroundColor: Theme.colors.background,
    borderBottomWidth: 1,
    borderBottomColor: Theme.colors.border,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: Theme.spacing.lg,
    paddingVertical: Theme.spacing.md,
  },
  headerTitleContainer: {
    flex: 1,
  },
  headerTitle: {
    fontSize: Theme.typography.fontSize.xl,
    fontWeight: '600',
    color: Theme.colors.text,
  },
  headerRightIcons: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerIconButton: {
    padding: Theme.spacing.xs,
    marginLeft: Theme.spacing.sm,
  },
  iconWrapper: {
    position: 'relative',
  },
  notificationBadge: {
    position: 'absolute',
    top: -4,
    right: -4,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: Theme.colors.error,
  },
  messageBadge: {
    backgroundColor: Theme.colors.info,
  },
  orderBadge: {
    backgroundColor: Theme.colors.success,
  },
}); 